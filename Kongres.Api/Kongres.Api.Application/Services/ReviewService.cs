using Kongres.Api.Application.Services.Interfaces;
using Kongres.Api.Domain.Entities;
using Kongres.Api.Infrastructure;
using Kongres.Api.Infrastructure.Repositories.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Kongres.Api.Domain.Enums;

namespace Kongres.Api.Application.Services
{
    public class ReviewService : IReviewService
    {
        private readonly IScientificWorkRepository _scientificWorkRepository;
        private readonly IScientificWorkFileRepository _scientificWorkFileRepository;
        private readonly IReviewerScientificWorkRepository _reviewersWorkRepository;
        private readonly IReviewRepository _reviewRepository;
        private readonly IFileManager _fileManager;
        private readonly UserManager<User> _userManager;
        private readonly IEmailSender _emailSender;

        public ReviewService(IScientificWorkRepository scientificWorkRepository,
                            IScientificWorkFileRepository scientificWorkFileRepository,
                            IReviewerScientificWorkRepository reviewersWorkRepository,
                            IReviewRepository reviewRepository,
                            IFileManager fileManager,
                            UserManager<User> userManager,
                            IEmailSender emailSender)
        {
            _scientificWorkRepository = scientificWorkRepository;
            _scientificWorkFileRepository = scientificWorkFileRepository;
            _reviewersWorkRepository = reviewersWorkRepository;
            _reviewRepository = reviewRepository;
            _fileManager = fileManager;
            _userManager = userManager;
            _emailSender = emailSender;
        }

        public async Task AddAnswerToReviewAsync(uint authorId, uint reviewId, string answerMsg)
        {
            // can user add answer to this review?
            var isAuthorOfWork = await _scientificWorkRepository.IsAuthorOfScientificWorkByReviewIdAsync(authorId, reviewId);

            if (!isAuthorOfWork)
                return;

            var review = await _reviewRepository.GetReviewByIdAsync(reviewId);

            // check if review have already answer
            if (review.Answer != null)
                return;

            var user = await _userManager.FindByIdAsync(authorId.ToString());

            // add answer to review
            review.Answer = new Answer()
            {
                AnswerDate = DateTime.Now,
                Comment = answerMsg,
                User = user,
            };

            await _reviewRepository.AddAnswerToReviewAsync(review);

            var scientificWorkId = await _reviewRepository.GetWorkIdByReviewIdAsync(reviewId);
            var emailOfReviewer = await _reviewRepository.GetEmailOfReviewerByReviewIdAsync(reviewId);
            await _emailSender.SendReceiveAnswerEmailAsync(emailOfReviewer, scientificWorkId);
        }

        public async Task AddReviewAsync(uint reviewerId, string reviewMsg, IFormFile reviewFile, byte rating, uint scientificWorkId)
        {
            // check if user is a reviewer for given ScientificWork
            var isReviewerOfScientificWork = await _scientificWorkRepository.IsReviewerOfScientificWorkAsync(reviewerId, scientificWorkId);

            if (!isReviewerOfScientificWork)
                return;

            // check if review exists
            var newestVersion = await _scientificWorkFileRepository.GetNewestVersionWithReviewsAsync(scientificWorkId);
            var isReviewAdded = newestVersion.Reviews.Any(x => x.Reviewer.Id == reviewerId);

            if (isReviewAdded)
                return;

            var reviewer = await _userManager.FindByIdAsync(reviewerId.ToString());

            var review = new Review()
            {
                VersionOfScientificWork = newestVersion,
                Reviewer = reviewer,
                DateReview = DateTime.Now,
                Rating = rating,
            };

            // add file only when it's not null
            if (!(reviewFile is null))
                review.File = await _fileManager.SaveFileAsync(reviewFile);

            // when reviewer doesn't write message 
            // it's just assign null (nothing change)
            review.Comment = reviewMsg;

            await _reviewRepository.AddReviewAsync(review);

            var reviewerCount = _reviewersWorkRepository.GetReviewersCount(scientificWorkId);
            var reviewsCount = _scientificWorkFileRepository.GetReviewsCountInNewestVersion(scientificWorkId);

            var emailOfAuthor = await _scientificWorkRepository.GetEmailOfAuthorByWorkIdAsync(scientificWorkId);

            // all reviewers added their reviews
            if (reviewsCount == reviewerCount)
            {
                var sumOfRating = await _scientificWorkFileRepository.GetRatingSumFromVersion(newestVersion.Id);
                var ratingAvg = (float)sumOfRating / reviewerCount;

                var work = await _scientificWorkRepository.GetWorkByIdAsync(scientificWorkId);

                if (ratingAvg < 1.5)
                {
                    work.Status = StatusEnum.Rejected;
                    newestVersion.Rating = 1;

                    await _emailSender.SendToAuthorWorkGotRejectedAsync(emailOfAuthor, scientificWorkId);
                }
                else if (ratingAvg <= 2.5)
                {
                    work.Status = StatusEnum.Correcting;
                    newestVersion.Rating = 2;
                    
                    await _emailSender.SendNewVersionEnabledEmailAsync(emailOfAuthor, scientificWorkId);
                }
                else
                {
                    work.Status = StatusEnum.Accepted;
                    newestVersion.Rating = 3;

                    await _emailSender.SendToAuthorWorkGotAcceptedAsync(emailOfAuthor, scientificWorkId);
                }

                await _scientificWorkRepository.ChangeStatusAsync(work);
                await _scientificWorkFileRepository.AddRatingAsync(newestVersion);
            }
            else
            {
                await _emailSender.SendReceiveReviewEmailAsync(emailOfAuthor, scientificWorkId);
            }
        }

        public async Task<Stream> GetStreamOfReviewFileAsync(uint userId, uint reviewId)
        {
            // check if user can see this file
            var isAuthorOfWork = await _scientificWorkRepository.IsAuthorOfScientificWorkByReviewIdAsync(userId, reviewId);
            if (!isAuthorOfWork)
            {
                var isAuthorOfReview = await _reviewRepository.IsAuthorOfReview(userId, reviewId);

                if (!isAuthorOfReview)
                    return null;
            }

            // check if file exists
            var review = await _reviewRepository.GetReviewByIdAsync(reviewId);

            // when review doesn't contains file,
            // return null
            // otherwise return file stream
            return review.File is null ? null : _fileManager.GetStreamOfFile(review.File);
        }
    }
}

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

namespace Kongres.Api.Application.Services
{
    public class ReviewService : IReviewService
    {
        private readonly IScientificWorkRepository _scientificWorkRepository;
        private readonly IScientificWorkFileRepository _scientificWorkFileRepository;
        private readonly IReviewRepository _reviewRepository;
        private readonly IFileManager _fileManager;
        private readonly UserManager<User> _userManager;

        public ReviewService(IScientificWorkRepository scientificWorkRepository,
                            IScientificWorkFileRepository scientificWorkFileRepository,
                            IReviewRepository reviewRepository,
                            IFileManager fileManager,
                            UserManager<User> userManager)
        {
            _scientificWorkRepository = scientificWorkRepository;
            _scientificWorkFileRepository = scientificWorkFileRepository;
            _reviewRepository = reviewRepository;
            _fileManager = fileManager;
            _userManager = userManager;
        }

        public async Task AddAnswerToReviewAsync(uint userId, uint reviewId, string answerMsg)
        {
            // can user add answer to this review?
            var isAuthorOfWork = await _scientificWorkRepository.IsAuthorOfScientificWorkByReviewIdAsync(userId, reviewId);

            if (!isAuthorOfWork)
                return;

            var review = await _reviewRepository.GetReviewByIdAsync(reviewId);

            // check if review have already answer
            if (review.Answer != null)
                return;

            var user = await _userManager.FindByIdAsync(userId.ToString());

            // add answer to review
            review.Answer = new Answer()
            {
                AnswerDate = DateTime.Now,
                Comment = answerMsg,
                User = user,
            };

            await _reviewRepository.AddAnswerToReviewAsync(review);
        }

        public async Task AddReviewAsync(uint userId, string reviewMsg, IFormFile reviewFile, byte rating, uint scientificWorkId)
        {
            // check if user is a reviewer for given ScientificWork
            var isReviewerOfScientificWork = await _scientificWorkRepository.IsReviewerOfScientificWorkAsync(userId, scientificWorkId);

            if (!isReviewerOfScientificWork)
                return;

            // check if review exists
            var newestVersion = await _scientificWorkFileRepository.GetNewestVersionWithReviewsAsync(scientificWorkId);
            var isReviewAdded = newestVersion.Reviews.Any(x => x.Reviewer.Id == userId);

            if (isReviewAdded)
                return;

            var reviewer = await _userManager.FindByIdAsync(userId.ToString());

            var review = new Review()
            {
                VersionOfScientificWork = newestVersion,
                Reviewer = reviewer,
                DateReview = DateTime.Now,
                Rating = rating,
            };

            // reviewer can add review only one way (string or file, not both!)
            if (reviewMsg is null)
                review.File = await _fileManager.SaveFileAsync(reviewFile);

            else if (reviewFile is null)
                review.Comment = reviewMsg;

            await _reviewRepository.AddReviewAsync(review);
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

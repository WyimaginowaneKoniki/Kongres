using Kongres.Api.Application.Services.Interfaces;
using Kongres.Api.Domain.Entities;
using Kongres.Api.Infrastructure.Repositories.Interfaces;
using Microsoft.AspNetCore.Identity;
using System;
using System.Threading.Tasks;

namespace Kongres.Api.Application.Services
{
    public class ReviewService : IReviewService
    {
        private readonly IScientificWorkRepository _scientificWorkRepository;
        private readonly IReviewRepository _reviewRepository;
        private readonly UserManager<User> _userManager;

        public ReviewService(IScientificWorkRepository scientificWorkRepository,
                            IReviewRepository reviewRepository,
                            UserManager<User> userManager)
        {
            _scientificWorkRepository = scientificWorkRepository;
            _reviewRepository = reviewRepository;
            _userManager = userManager;
        }

        public async Task AddAnswerToReviewAsync(uint userId, uint reviewId, string answerMsg)
        {
            // can user add answer to this review?
            var isAuthorOfWork = await _scientificWorkRepository.IsAuthorOfScientificWorkAsync(userId, reviewId);

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
                AnswerDate = DateTime.UtcNow,
                Comment = answerMsg,
                User = user,
            };

            await _reviewRepository.AddAnswerToReviewAsync(review);
        }
    }
}

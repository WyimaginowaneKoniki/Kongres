using System.Threading.Tasks;
using Kongres.Api.Domain.Entities;

namespace Kongres.Api.Infrastructure.Repositories.Interfaces
{
    public interface IReviewRepository : IRepository
    {
        Task<bool> IsReviewerAsync(uint scientificWorkId, uint userId);
        Task<Review> GetReviewByIdAsync(uint reviewId);
        Task AddAnswerToReviewAsync(Review review);
        Task AddReviewAsync(Review review);
        Task<bool> IsAuthorOfReview(uint userId, uint reviewId);
        Task<string> GetEmailOfReviewerByReviewIdAsync(uint reviewId);
        Task<uint> GetWorkIdByReviewIdAsync(uint reviewId);
    }
}

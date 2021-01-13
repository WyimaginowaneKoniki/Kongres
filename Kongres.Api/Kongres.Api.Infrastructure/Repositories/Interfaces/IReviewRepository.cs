using System.Threading.Tasks;
using Kongres.Api.Domain.Entities;

namespace Kongres.Api.Infrastructure.Repositories.Interfaces
{
    public interface IReviewRepository : IRepository
    {
        Task<bool> IsReviewerAsync(uint scientificWorkId, uint userId);
        Task<Review> GetReviewByIdAsync(uint reviewId);
        Task AddAnswerToReviewAsync(Review review);
    }
}

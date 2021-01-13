using System.Linq;
using System.Threading.Tasks;
using Kongres.Api.Domain.Entities;
using Kongres.Api.Infrastructure.Context;
using Kongres.Api.Infrastructure.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Kongres.Api.Infrastructure.Repositories
{
    public class ReviewRepository : IReviewRepository
    {
        private readonly KongresDbContext _context;

        public ReviewRepository(KongresDbContext context)
        {
            _context = context;
        }

        public async Task<bool> IsReviewerAsync(uint scientificWorkId, uint userId)
            => await _context.ReviewersScienceWorks.Include(x => x.User)
                                                   .Include(x => x.ScientificWork)
                                                   .AnyAsync(x => x.ScientificWork.Id == scientificWorkId
                                                                  && x.User.Id == userId);

        public async Task<Review> GetReviewByIdAsync(uint reviewId)
            => await _context.Reviews.Include(x => x.Answer)
                                     .FirstOrDefaultAsync(x => x.Id == reviewId);

        public async Task AddAnswerToReviewAsync(Review review)
        {
            _context.Reviews.Update(review);
            await _context.SaveChangesAsync();
        }
    }
}

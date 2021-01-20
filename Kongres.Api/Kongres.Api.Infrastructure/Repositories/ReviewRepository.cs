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

        // check if reviewer is assign to given scientific work
        public async Task<bool> IsReviewerAsync(uint scientificWorkId, uint userId)
            => await _context.ReviewersScienceWorks.Include(x => x.User)
                                                   .Include(x => x.ScientificWork)
                                                   .AnyAsync(x => x.ScientificWork.Id == scientificWorkId &&
                                                                  x.User.Id == userId);

        public async Task<Review> GetReviewByIdAsync(uint reviewId)
            => await _context.Reviews.Include(x => x.Answer)
                                     .FirstOrDefaultAsync(x => x.Id == reviewId);

        public async Task AddAnswerToReviewAsync(Review review)
        {
            _context.Reviews.Update(review);
            await _context.SaveChangesAsync();
        }

        public async Task AddReviewAsync(Review review)
        {
            await _context.Reviews.AddAsync(review);
            await _context.SaveChangesAsync();
        }

        public async Task<bool> IsAuthorOfReview(uint userId, uint reviewId)
            => await _context.Reviews.Include(x => x.Reviewer)
                                     .AnyAsync(x => x.Id == reviewId &&
                                                    x.Reviewer.Id == userId);

        public async Task<string> GetEmailOfReviewerByReviewIdAsync(uint reviewId)
            => await _context.Reviews.Where(x => x.Id == reviewId)
                                     .Select(x => x.Reviewer.Email)
                                     .SingleAsync();

        public async Task<uint> GetWorkIdByReviewIdAsync(uint reviewId)
            => await _context.Reviews.Where(x => x.Id == reviewId)
                                     .Select(x => x.VersionOfScientificWork.ScientificWork.Id)
                                     .SingleAsync();
    }
}

using System.Collections.Generic;
using System.Linq;
using Kongres.Api.Domain.Entities;
using Kongres.Api.Infrastructure.Repositories.Interfaces;
using System.Threading.Tasks;
using Kongres.Api.Infrastructure.Context;
using Microsoft.EntityFrameworkCore;

namespace Kongres.Api.Infrastructure.Repositories
{
    public class ReviewerScientificWorkRepository : IReviewersScienceWorkRepository
    {
        private readonly KongresDbContext _context;

        public ReviewerScientificWorkRepository(KongresDbContext context)
        {
            _context = context;
        }

        public async Task AddAsync(IEnumerable<ReviewersScienceWork> reviewersScienceWorks)
        {
            await _context.ReviewersScienceWorks.AddRangeAsync(reviewersScienceWorks);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<string>> GetEmailsOfReviewersByWorkIdAsync(uint scientificWorkId)
            => await _context.ReviewersScienceWorks.Where(x => x.ScientificWork.Id == scientificWorkId)
                                                   .Select(x => x.User.Email)
                                                   .ToListAsync();

        public int GetReviewersCount(uint scientificWorkId)
            => _context.ReviewersScienceWorks.Count(x => x.ScientificWork.Id == scientificWorkId);
    }
}

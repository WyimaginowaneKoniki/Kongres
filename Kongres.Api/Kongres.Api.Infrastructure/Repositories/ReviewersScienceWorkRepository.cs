using Kongres.Api.Domain.Entities;
using Kongres.Api.Infrastructure.Context;
using Kongres.Api.Infrastructure.Repositories.Interfaces;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace Kongres.Api.Infrastructure.Repositories
{
    public class ReviewersScienceWorkRepository : IReviewersScienceWorkRepository
    {
        private readonly KongresDbContext _context;

        public ReviewersScienceWorkRepository(KongresDbContext context)
        {
            _context = context;
        }

        public IEnumerable<ScientificWork> GetListOfWorksForReviewer(uint reviewerId)
            => _context.ReviewersScienceWorks.Include(x => x.ScientificWork)
                                                .ThenInclude(x => x.Versions)
                                             .Include(x => x.ScientificWork)
                                                .ThenInclude(x => x.MainAuthor)
                                             .Where(x => x.User.Id == reviewerId)
                                             .Select(x => x.ScientificWork);
    }
}

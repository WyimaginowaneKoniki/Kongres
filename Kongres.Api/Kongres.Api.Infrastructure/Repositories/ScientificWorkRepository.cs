using Kongres.Api.Domain.Entities;
using Kongres.Api.Infrastructure.Context;
using Kongres.Api.Infrastructure.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Kongres.Api.Infrastructure.Repositories
{
    public class ScientificWorkRepository : IScientificWorkRepository
    {
        private readonly KongresDbContext _context;

        public ScientificWorkRepository(KongresDbContext context)
        {
            _context = context;
        }

        public async Task AddAsync(ScientificWork scienceWork)
        {
            await _context.ScientificWorks.AddAsync(scienceWork);
            await _context.SaveChangesAsync();
        }

        public async Task<ScientificWork> GetByUserIdAsync(uint userId)
            => await _context.ScientificWorks.FirstAsync(x => x.MainAuthor.Id == userId);

        public async Task<IEnumerable<ScientificWork>> GetApprovedWorksAsync()
            => await _context.ScientificWorks.Include(x => x.MainAuthor)
                                             .Include(x => x.Versions)
                                             .ToListAsync();

        public async Task<ScientificWork> GetWorkByIdAsync(uint scientificWorkId)
            => await _context.ScientificWorks.Include(x => x.MainAuthor)
                                             .Include(x => x.Versions)
                                             .SingleOrDefaultAsync(x => x.Id == scientificWorkId);

        public async Task<bool> IsAuthorOfScientificWorkAsync(uint userId, uint reviewOfWorkId)
            => await _context.ScientificWorks.Include(x => x.MainAuthor)
                                             .Include(x => x.Versions)
                                                .ThenInclude(x => x.Reviews)
                                             .AnyAsync(x => x.MainAuthor.Id == userId &&
                                                            x.Versions.Any(y => y.Reviews.Any(k => k.Id == reviewOfWorkId)));
    }
}

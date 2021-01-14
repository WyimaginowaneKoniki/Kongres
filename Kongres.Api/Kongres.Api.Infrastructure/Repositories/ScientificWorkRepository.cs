using Kongres.Api.Domain.Entities;
using Kongres.Api.Infrastructure.Context;
using Kongres.Api.Infrastructure.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
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
    }
}

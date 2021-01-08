using Kongres.Api.Domain.Entities;
using Kongres.Api.Infrastructure.Context;
using Kongres.Api.Infrastructure.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
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

        public async Task AddAsync(ScienceWork scienceWork)
        {
            await _context.ScienceWorks.AddAsync(scienceWork);
            await _context.SaveChangesAsync();
        }

        public async Task<ScienceWork> GetByUserIdAsync(uint userId)
            => await _context.ScienceWorks.FirstAsync(x => x.MainAuthor.Id == userId);
    }
}

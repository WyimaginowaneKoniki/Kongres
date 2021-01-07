using System.Threading.Tasks;
using Kongres.Api.Domain.Entities;
using Kongres.Api.Infrastructure.Context;
using Kongres.Api.Infrastructure.Repositories.Interfaces;

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
    }
}

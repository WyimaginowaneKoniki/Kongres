using Kongres.Api.Domain.Entities;
using Kongres.Api.Infrastructure.Context;
using Kongres.Api.Infrastructure.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Kongres.Api.Infrastructure.Repositories
{
    public class ReviewerRepository : IReviewerRepository
    {
        private readonly KongresDbContext _context;

        public ReviewerRepository(KongresDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<User>> GetAllBySpecializationAsync(string specialization)
            => await _context.Users.Where(x => x.Specialization == specialization &&
                                               x.NormalizedUserName.Contains("REVIEWER"))
                                   .ToListAsync();
    }
}

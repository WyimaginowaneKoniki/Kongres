using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Kongres.Api.Domain.Entities;
using Kongres.Api.Infrastructure.Context;
using Kongres.Api.Infrastructure.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Kongres.Api.Infrastructure.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly KongresDbContext _context;

        public UserRepository(KongresDbContext context)
        {
            _context = context;
        }

        public string GetEmailById(uint userId)
            => _context.Users.Find(userId).Email;

        public async Task<IEnumerable<User>> GetAllBySpecializationAsync(string specialization)
            => await _context.Users.Where(x => x.Specialization == specialization &&
                                               x.NormalizedUserName.Contains("REVIEWER"))
                                   .ToListAsync();
    }
}
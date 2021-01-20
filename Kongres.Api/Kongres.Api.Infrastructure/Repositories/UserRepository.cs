using Kongres.Api.Infrastructure.Context;
using Kongres.Api.Infrastructure.Repositories.Interfaces;

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
    }
}
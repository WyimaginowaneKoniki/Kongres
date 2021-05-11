using System.Collections.Generic;
using System.Threading.Tasks;
using Kongres.Api.Domain.Entities;

namespace Kongres.Api.Infrastructure.Repositories.Interfaces
{
    public interface IUserRepository : IRepository
    {
        string GetEmailById(uint id);
        Task<IEnumerable<User>> GetAllBySpecializationAsync(string specialization);
    }
}

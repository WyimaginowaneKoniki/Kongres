using System.Collections.Generic;
using System.Threading.Tasks;
using Kongres.Api.Domain.Entities;

namespace Kongres.Api.Infrastructure.Repositories.Interfaces
{
    public interface IReviewerRepository : IRepository
    {
        Task<IEnumerable<User>> GetAllBySpecializationAsync(string specialization);
    }
}

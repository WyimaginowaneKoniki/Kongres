using Kongres.Api.Domain.Entities;
using System.Threading.Tasks;

namespace Kongres.Api.Infrastructure.Repositories.Interfaces
{
    public interface IScientificWorkRepository : IRepository
    {
        Task AddAsync(ScientificWork scienceWork);
        Task<ScientificWork> GetByUserIdAsync(uint userId);
    }
}

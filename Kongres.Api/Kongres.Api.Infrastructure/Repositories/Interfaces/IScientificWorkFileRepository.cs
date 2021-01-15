using Kongres.Api.Domain.Entities;
using System.Threading.Tasks;

namespace Kongres.Api.Infrastructure.Repositories.Interfaces
{
    public interface IScientificWorkFileRepository : IRepository
    {
        Task AddAsync(ScientificWorkFile scientificWorkFile);
        Task<ScientificWorkFile> GetNewestVersionAsync(uint workId);
    }
}

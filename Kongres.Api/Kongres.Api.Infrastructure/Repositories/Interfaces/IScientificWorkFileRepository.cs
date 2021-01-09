using System.Threading.Tasks;
using Kongres.Api.Domain.Entities;

namespace Kongres.Api.Infrastructure.Repositories.Interfaces
{
    public interface IScientificWorkFileRepository : IRepository
    {
        Task AddAsync(ScientificWorkFile scientificWorkFile);
    }
}

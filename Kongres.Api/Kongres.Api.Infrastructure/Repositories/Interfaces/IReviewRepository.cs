using System.Threading.Tasks;

namespace Kongres.Api.Infrastructure.Repositories.Interfaces
{
    public interface IReviewRepository : IRepository
    {
        Task<bool> IsReviewerAsync(uint scientificWorkId, uint userId);
    }
}

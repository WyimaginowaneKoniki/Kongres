using Kongres.Api.Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Kongres.Api.Infrastructure.Repositories.Interfaces
{
    public interface IScientificWorkFileRepository : IRepository
    {
        Task AddAsync(ScientificWorkFile scientificWorkFile);
        Task<ScientificWorkFile> GetNewestVersionAsync(uint workId);
        Task<ScientificWorkFile> GetNewestVersionWithReviewsAsync(uint workId);
        Task<IEnumerable<ScientificWorkFile>> GetVersionsWithReviews(uint workId);
        int GetReviewsCountInNewestVersion(uint workId);
        Task<int> GetRatingSumFromVersion(uint versionId);
        Task AddRatingAsync(ScientificWorkFile scientificWorkFile);
    }
}

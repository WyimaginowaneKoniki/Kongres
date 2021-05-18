using Kongres.Api.Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Kongres.Api.Infrastructure.Repositories.Interfaces
{
    public interface IReviewerScientificWorkRepository : IRepository
    {
        Task<IEnumerable<ScientificWork>> GetListOfWorksForReviewerAsync(uint reviewerId);
        Task AddAsync(IEnumerable<ReviewersScienceWork> reviewersScienceWorks);
        Task<IEnumerable<string>> GetEmailsOfReviewersByWorkIdAsync(uint scientificWorkId);
        int GetReviewersCount(uint scientificWorkId);
        Task<bool> IsReviewerAsync(uint scientificWorkId, uint userId);
        Task<bool> IsReviewerOfScientificWorkAsync(uint userId, uint scientificWorkId);
    }
}

using Kongres.Api.Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Kongres.Api.Infrastructure.Repositories.Interfaces
{
    public interface IReviewersScienceWorkRepository : IRepository
    {
        Task AddAsync(IEnumerable<ReviewersScienceWork> reviewersScienceWorks);
        Task<IEnumerable<string>> GetEmailsOfReviewersByWorkIdAsync(uint scientificWorkId);
        int GetReviewersCount(uint scientificWorkId);
    }
}

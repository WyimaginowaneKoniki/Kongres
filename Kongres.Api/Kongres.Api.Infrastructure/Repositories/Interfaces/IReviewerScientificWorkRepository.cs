using Kongres.Api.Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Kongres.Api.Infrastructure.Repositories.Interfaces
{
    public interface IReviewerScientificWorkRepository : IRepository
    {
        IEnumerable<ScientificWork> GetListOfWorksForReviewer(uint reviewerId);
        Task AddAsync(IEnumerable<ReviewersScienceWork> reviewersScienceWorks);
    }
}

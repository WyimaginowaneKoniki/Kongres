using Kongres.Api.Domain.Entities;
using System.Collections.Generic;

namespace Kongres.Api.Infrastructure.Repositories.Interfaces
{
    public interface IReviewersScienceWorkRepository : IRepository
    {
        IEnumerable<ScientificWork> GetListOfWorksForReviewer(uint reviewerId);
    }
}

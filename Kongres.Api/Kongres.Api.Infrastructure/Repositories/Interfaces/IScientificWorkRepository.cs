﻿using Kongres.Api.Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Kongres.Api.Infrastructure.Repositories.Interfaces
{
    public interface IScientificWorkRepository : IRepository
    {
        Task AddAsync(ScientificWork scienceWork);
        Task<ScientificWork> GetByUserIdAsync(uint userId);
        Task<IEnumerable<ScientificWork>> GetApprovedWorksAsync();
        Task<ScientificWork> GetWorkByIdAsync(uint scientificWorkId);
        Task<bool> IsAuthorOfScientificWorkAsync(uint userId, uint reviewOfWorkId);
    }
}

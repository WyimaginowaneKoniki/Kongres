﻿using Kongres.Api.Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Kongres.Api.Infrastructure.Repositories.Interfaces
{
    public interface IScientificWorkRepository : IRepository
    {
        Task AddAsync(ScientificWork scienceWork);
        Task<ScientificWork> GetByAuthorIdAsync(uint authorId);
        Task<IEnumerable<ScientificWork>> GetApprovedWorksAsync();
        Task<ScientificWork> GetWorkByIdAsync(uint scientificWorkId);
        Task<bool> IsAuthorOfScientificWorkByReviewIdAsync(uint userId, uint reviewOfWorkId);
        Task<byte> GetNumberOfVersionsByAuthorIdAsync(uint userId);
        Task<IEnumerable<ScientificWork>> GetAllBySpecializationAsync(string specialization);
        Task ChangeStatusAsync(ScientificWork scientificWork);
        Task<string> GetEmailOfAuthorByWorkIdAsync(uint scientificWorkId);
        Task<uint> GetIdOfWorkByAuthorIdAsync(uint authorId);
    }
}

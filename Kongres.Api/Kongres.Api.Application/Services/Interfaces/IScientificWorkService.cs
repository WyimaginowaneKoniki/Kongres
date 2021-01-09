using Kongres.Api.Domain.DTOs;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

namespace Kongres.Api.Application.Services.Interfaces
{
    public interface IScientificWorkService : IService
    {
        Task AddBasicInfoAsync(string userId, string title, string description, string authors, string specialization);
        Task AddVersionAsync(uint userId, IFormFile workFile, byte versionNumber = 0);
        Task<IEnumerable<ScientificWorkDto>> GetApprovedWorksAsync();
        Task<Stream> GetStreamOfScientificWorkAsync(uint workId);
    }
}

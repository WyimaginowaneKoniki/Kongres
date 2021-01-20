using Kongres.Api.Domain.DTOs;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

namespace Kongres.Api.Application.Services.Interfaces
{
    public interface IScientificWorkService : IService
    {
        Task<uint> AddBasicInfoAsync(uint userId, string title, string description, string authors, string specialization);
        Task AddVersionAsync(uint userId, IFormFile workFile, bool isFirstVersion = false);
        Task<IEnumerable<ScientificWorkDto>> GetApprovedWorksAsync();
        Task<Stream> GetStreamOfScientificWorkAsync(uint workId);
        Task<ScientificWorkWithReviewDto> GetWorkByIdAsync(uint userId, uint scientificWorkId);
        Task<IEnumerable<ScientificWorkWithStatusDto>> GetListOfWorksForReviewer(uint reviewerId);
    }
}

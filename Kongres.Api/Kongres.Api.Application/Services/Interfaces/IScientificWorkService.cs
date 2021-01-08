using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

namespace Kongres.Api.Application.Services.Interfaces
{
    public interface IScientificWorkService : IService
    {
        Task AddBasicInfoAsync(string userId, string title, string description, string authors);
        Task AddVersionAsync(uint userId, IFormFile workFile, byte versionNumber = 0);
    }
}

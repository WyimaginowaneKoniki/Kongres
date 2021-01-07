using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace Kongres.Api.Infrastructure
{
    public interface IFileManager
    {
        Task<string> SaveFileAsync(IFormFile file);
    }
}

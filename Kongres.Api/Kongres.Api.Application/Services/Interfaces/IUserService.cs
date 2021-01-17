using System.Threading.Tasks;
using Kongres.Api.Domain.DTOs;

namespace Kongres.Api.Application.Services.Interfaces
{
    public interface IUserService : IService
    {
        Task<HeaderUserInfoDto> GetUserInfoForHeaderAsync(string userId);
    }
}

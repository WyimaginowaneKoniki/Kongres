using System.Threading.Tasks;
using Kongres.Api.Application.Services.Interfaces;
using Kongres.Api.Domain.DTOs;
using Kongres.Api.Domain.Entities;
using Kongres.Api.Infrastructure;
using Kongres.Api.Infrastructure.Repositories.Interfaces;
using Microsoft.AspNetCore.Identity;

namespace Kongres.Api.Application.Services
{
    public class UserService : IUserService
    {
        private readonly UserManager<User> _userManager;
        private readonly IScientificWorkRepository _scientificWorkRepository;
        private readonly IFileManager _fileManager;

        public UserService(UserManager<User> userManager,
                            IScientificWorkRepository scientificWorkRepository,
                            IFileManager fileManager)
        {
            _userManager = userManager;
            _scientificWorkRepository = scientificWorkRepository;
            _fileManager = fileManager;
        }

        public async Task<HeaderUserInfoDto> GetUserInfoForHeaderAsync(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            var scientificWork = await _scientificWorkRepository.GetByAuthorIdAsync(user.Id);

            string base64Photo = null;

            if (!(user.Photo is null))
            {
                var photo =  await _fileManager.GetBase64FileAsync(user.Photo);
                var photoExtension = user.Photo.Split(".")[^1];
                base64Photo = $"data:image/{photoExtension};base64,{photo}";
            }

            return new HeaderUserInfoDto()
            {
                Name = $"{user.Name} {user.Surname}",
                Role = user.UserName.Split(":")[0],
                PhotoBase64 = base64Photo,
                ScientificWorkId = scientificWork?.Id ?? 0
            };
        }
    }
}

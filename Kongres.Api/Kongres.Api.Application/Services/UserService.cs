using System.Threading.Tasks;
using Kongres.Api.Application.Commands.Users;
using Kongres.Api.Application.Services.Interfaces;
using Kongres.Api.Domain.DTOs;
using Kongres.Api.Domain.Entities;
using Kongres.Api.Domain.Enums;
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
        private readonly IEmailSender _emailSender;

        public UserService(UserManager<User> userManager,
                            IScientificWorkRepository scientificWorkRepository,
                            IFileManager fileManager,
                            IEmailSender emailSender)
        {
            _userManager = userManager;
            _scientificWorkRepository = scientificWorkRepository;
            _fileManager = fileManager;
            _emailSender = emailSender;
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

        public async Task RegisterAsync(UserTypeEnum userType, CreateUserCommand command)
        {
            var user = new User
            {
                Name = command.FirstName,
                UserName = $"{userType}:{command.Email}",
                Surname = command.LastName,
                Degree = command.AcademicTitle,
                Email = command.Email,
                Specialization = command.Specialization,
                University = command.University
            };

            // only participant have avatar
            if (userType == UserTypeEnum.Participant)
                user.Photo = await _fileManager.SaveFileAsync(command.Avatar);

            var createUserResult = await _userManager.CreateAsync(user, command.Password);

            if (createUserResult.Succeeded)
            {
                await _userManager.AddToRoleAsync(user, userType.ToString());
                var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                await _emailSender.SendConfirmationEmailAsync(user.Id, user.Email, token);
            }
        }
    }
}

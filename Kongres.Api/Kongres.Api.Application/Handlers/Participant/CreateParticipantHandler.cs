using System.Threading;
using System.Threading.Tasks;
using Kongres.Api.Application.Commands.Participant;
using Kongres.Api.Domain.Entities;
using Kongres.Api.Domain.Enums;
using Kongres.Api.Infrastructure;
using MediatR;
using Microsoft.AspNetCore.Identity;
using NETCore.MailKit.Core;

namespace Kongres.Api.Application.Handlers.Participant
{
    public class CreateParticipantHandler : AsyncRequestHandler<CreateParticipantCommand>
    {
        private readonly UserManager<User> _userManager;
        private readonly IFileManager _fileManager;
        private readonly IEmailService _emailService;

        public CreateParticipantHandler(UserManager<User> userManager, IFileManager fileManager, IEmailService emailService)
        {
            _userManager = userManager;
            _fileManager = fileManager;
            _emailService = emailService;
        }

        protected override async Task Handle(CreateParticipantCommand request, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();

            var fileName = await _fileManager.SaveFileAsync(request.Avatar);

            const UserTypeEnum userType = UserTypeEnum.Participant;
            var userName = $"{userType}:{request.Email}";

            var user = new User
            {
                Name = request.FirstName,
                UserName = userName,
                Surname = request.LastName,
                Degree = request.AcademicTitle,
                Email = request.Email,
                Specialization = request.Specialization,
                University = request.University,
                Photo = fileName
            };

            var createUserResult = await _userManager.CreateAsync(user, request.Password);

            if (createUserResult.Succeeded)
                await _userManager.AddToRoleAsync(user, userType.ToString());

            var link = "https://localhost:5001";

            var message = $"<a href='{link}'>Please confirm email</a>";
            await _emailService.SendAsync(request.Email, "Verify account", message, true);
        }
    }
}

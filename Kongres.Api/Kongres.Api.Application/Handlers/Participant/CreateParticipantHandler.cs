using System.Threading;
using System.Threading.Tasks;
using Kongres.Api.Application.Commands.Participant;
using Kongres.Api.Domain.Entities;
using Kongres.Api.Domain.Enums;
using Kongres.Api.Infrastructure;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Kongres.Api.Application.Handlers.Participant
{
    public class CreateParticipantHandler : AsyncRequestHandler<CreateParticipantCommand>
    {
        private readonly UserManager<User> _userManager;
        private readonly IFileManager _fileManager;

        public CreateParticipantHandler(UserManager<User> userManager, IFileManager fileManager)
        {
            _userManager = userManager;
            _fileManager = fileManager;
        }

        protected override async Task Handle(CreateParticipantCommand request, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();

            var fileName = await _fileManager.SaveFile(request.Avatar);

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
        }
    }
}

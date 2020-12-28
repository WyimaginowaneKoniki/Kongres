using System.Threading;
using System.Threading.Tasks;
using Kongres.Api.Application.Commands.Participant;
using Kongres.Api.Domain.Entities;
using Kongres.Api.Domain.Enums;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Kongres.Api.Application.Handlers.Participant
{
    public class CreateParticipantHandler : AsyncRequestHandler<CreateParticipantCommand>
    {
        private readonly UserManager<User> _userManager;

        public CreateParticipantHandler(UserManager<User> userManager)
        {
            _userManager = userManager;
        }

        protected override async Task Handle(CreateParticipantCommand request, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();

            const UserTypeEnum userType = UserTypeEnum.Participant;
            var userName = $"{userType}:{request.Email}";

            var user = new User
            {
                Name = request.Name,
                UserName = userName,
                Surname = request.Surname,
                Degree = request.Degree,
                Email = request.Email,
                Specialization = request.Specialization,
                University = request.University
            };

            var createUserResult = await _userManager.CreateAsync(user, request.Password);

            if (createUserResult.Succeeded)
            {
                await _userManager.AddToRoleAsync(user, nameof(userType));
            }
        }
    }
}

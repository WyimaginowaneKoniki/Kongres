using Kongres.Api.Application.Commands.Users.Participant;
using Kongres.Api.Application.Services.Interfaces;
using Kongres.Api.Domain.Enums;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace Kongres.Api.Application.Handlers.Users.Participant
{
    public class LoginParticipantHandler : AsyncRequestHandler<LoginParticipantCommand>
    {
        private readonly IUserService _userService;

        public LoginParticipantHandler(IUserService userService)
        {
            _userService = userService;
        }

        protected override async Task Handle(LoginParticipantCommand request, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();

            await _userService.LoginAsync(UserTypeEnum.Participant, request);
        }
    }
}

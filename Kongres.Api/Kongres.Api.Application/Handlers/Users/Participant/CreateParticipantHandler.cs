using System.Threading;
using System.Threading.Tasks;
using Kongres.Api.Application.Commands.Users.Participant;
using Kongres.Api.Application.Services.Interfaces;
using Kongres.Api.Domain.Enums;
using MediatR;

namespace Kongres.Api.Application.Handlers.Users.Participant
{
    public class CreateParticipantHandler : AsyncRequestHandler<CreateParticipantCommand>
    {
        private readonly IUserService _userService;

        public CreateParticipantHandler(IUserService userService)
        {
            _userService = userService;
        }

        protected override async Task Handle(CreateParticipantCommand request, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();

            await _userService.RegisterAsync(UserTypeEnum.Participant, request);
        }
    }
}

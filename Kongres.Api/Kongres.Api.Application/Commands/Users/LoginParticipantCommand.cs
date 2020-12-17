using MediatR;

namespace Kongres.Api.Application.Commands.Users
{
    public class LoginParticipantCommand : IRequest
    {
        public string UserName { get; set; }
        public string Password { get; set; }
    }
}

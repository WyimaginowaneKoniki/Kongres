using MediatR;

namespace Kongres.Api.Application.Commands.Reviewer
{
    public class LoginReviewerCommand : IRequest
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}

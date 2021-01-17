using System;
using MediatR;

namespace Kongres.Api.Application.Commands.Users.Reviewer
{
    public class LoginReviewerCommand : IRequest
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public Guid TokenId { get; set; }
    }
}

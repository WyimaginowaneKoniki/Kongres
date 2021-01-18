using MediatR;
using System;

namespace Kongres.Api.Application.Commands.Users
{
    public class LoginUserCommand : IRequest
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public Guid TokenId { get; set; }
    }
}

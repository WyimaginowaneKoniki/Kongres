using MediatR;

namespace Kongres.Api.Application.Commands.Users
{
    public class CreateUserCommand : IRequest
    {
        public string PasswordHash { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }
        public string Specialization { get; set; }
        public string University { get; set; }
        public string Degree { get; set; }
        public string Photo { get; set; }
        public string UserType { get; set; }
    }
}

using MediatR;
using Microsoft.AspNetCore.Http;

namespace Kongres.Api.Application.Commands.Users
{
    public class CreateUserCommand : IRequest
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Specialization { get; set; }
        public string University { get; set; }
        public string AcademicTitle { get; set; }
        public IFormFile Avatar { get; set; }
    }
}

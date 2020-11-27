using Kongres.Api.Application.Commands.Users;
using Kongres.Api.Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Identity;
using System.Threading;
using System.Threading.Tasks;

namespace Kongres.Api.Application.Handlers.Users
{
    public class CreateUserHandler : AsyncRequestHandler<CreateUserCommand>
    {
        private readonly UserManager<User> _userManager;

        public CreateUserHandler(UserManager<User> userManager)
        {
            _userManager = userManager;
        }

        protected override async Task Handle(CreateUserCommand request, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();

            var user = new User()
            {
                Name = request.Name,
                UserName = request.Email,
                Surname = request.Surname,
                Degree = request.Degree,
                Email = request.Email,
                Specialization = request.Specialization,
                University = request.University
            };

            await _userManager.CreateAsync(user, request.PasswordHash);
        }
    }
}

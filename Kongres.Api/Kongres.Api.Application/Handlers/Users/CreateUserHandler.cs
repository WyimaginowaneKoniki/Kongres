using System;
using System.Linq;
using Kongres.Api.Application.Commands.Users;
using Kongres.Api.Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Identity;
using System.Threading;
using System.Threading.Tasks;
using Kongres.Api.Domain.Enums;

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

            if (!UserType.IsContains(request.UserType))
            {
                throw new ArgumentException("Wrong user type");
            }

            var userName = $"{request.UserType}:{request.Email}";

            var user = new User()
            {
                Name = request.Name,
                UserName = userName,
                Surname = request.Surname,
                Degree = request.Degree,
                Email = request.Email,
                Specialization = request.Specialization,
                University = request.University
            };

            var createUserResult = await _userManager.CreateAsync(user, request.PasswordHash);

            if (createUserResult.Succeeded && UserType.IsContains(request.UserType))
            {
                await _userManager.AddToRoleAsync(user, request.UserType);
            }
        }
    }
}

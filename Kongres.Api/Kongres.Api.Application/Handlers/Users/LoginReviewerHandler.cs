using System;
using Kongres.Api.Application.Commands.Users;
using Kongres.Api.Domain.Entities;
using Kongres.Api.Domain.Enums;
using MediatR;
using Microsoft.AspNetCore.Identity;
using System.Threading;
using System.Threading.Tasks;

namespace Kongres.Api.Application.Handlers.Users
{
    public class LoginReviewerHandler : AsyncRequestHandler<LoginReviewerCommand>
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;

        public LoginReviewerHandler(UserManager<User> userManager, SignInManager<User> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        protected override async Task Handle(LoginReviewerCommand request, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();

            var userName = $"{nameof(UserTypeEnum.Reviewer)}:{request.UserName}";

            var user = await _userManager.FindByNameAsync(userName);

            if (user is null)
            {
                throw new Exception("Invalid credentials");
            }

            var result = await _signInManager.PasswordSignInAsync(user, request.Password, false, false);
            if (result.Succeeded)
            {
                // return login/JWT token
            }
        }
    }
}

using System;
using System.Threading;
using System.Threading.Tasks;
using Kongres.Api.Application.Commands.Participant;
using Kongres.Api.Application.Services;
using Kongres.Api.Domain.Entities;
using Kongres.Api.Domain.Enums;
using Kongres.Api.Domain.Extensions;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Caching.Memory;

namespace Kongres.Api.Application.Handlers.Participant
{
    public class LoginParticipantHandler : AsyncRequestHandler<LoginParticipantCommand>
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly IJwtHandler _jwtHandler;
        private readonly IMemoryCache _cache;

        public LoginParticipantHandler(UserManager<User> userManager,
                                        SignInManager<User> signInManager,
                                        IJwtHandler jwtHandler,
                                        IMemoryCache cache)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _jwtHandler = jwtHandler;
            _cache = cache;
        }

        protected override async Task Handle(LoginParticipantCommand request, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();
            var userName = $"{nameof(UserTypeEnum.Participant)}:{request.Email}";

            var user = await _userManager.FindByNameAsync(userName);

            if (user is null)
            {
                throw new Exception("Invalid credentials");
            }

            var result = await _signInManager.PasswordSignInAsync(user, request.Password, false, false);
            if (result.Succeeded)
            {
                // return login/JWT token
                var jwtToken = _jwtHandler.CreateToken(user.Id, UserTypeEnum.Participant.ToString());
                _cache.SetJwt(request.TokenId, jwtToken);
            }
        }
    }
}

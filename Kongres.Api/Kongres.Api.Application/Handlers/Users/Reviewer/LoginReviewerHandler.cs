using Kongres.Api.Application.Commands.Users.Reviewer;
using Kongres.Api.Application.Services.Interfaces;
using Kongres.Api.Domain.Enums;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace Kongres.Api.Application.Handlers.Users.Reviewer
{
    public class LoginReviewerHandler : AsyncRequestHandler<LoginReviewerCommand>
    {
        private readonly IUserService _userService;

        public LoginReviewerHandler(IUserService userService)
        {
            _userService = userService;
        }

        protected override async Task Handle(LoginReviewerCommand request, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();

            await _userService.LoginAsync(UserTypeEnum.Reviewer, request);
        }
    }
}

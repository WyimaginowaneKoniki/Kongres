using System.Threading;
using System.Threading.Tasks;
using Kongres.Api.Application.Commands.Users.Reviewer;
using Kongres.Api.Application.Services.Interfaces;
using Kongres.Api.Domain.Enums;
using MediatR;

namespace Kongres.Api.Application.Handlers.Users.Reviewer
{
    public class CreateReviewerHandler : AsyncRequestHandler<CreateReviewerCommand>
    {
        private readonly IUserService _userService;

        public CreateReviewerHandler(IUserService userService)
        {
            _userService = userService;
        }

        protected override async Task Handle(CreateReviewerCommand request, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();

            await _userService.RegisterAsync(UserTypeEnum.Reviewer, request);
        }
    }
}

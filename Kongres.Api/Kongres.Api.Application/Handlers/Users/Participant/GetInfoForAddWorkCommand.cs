using System.Threading;
using System.Threading.Tasks;
using Kongres.Api.Application.Queries.Users;
using Kongres.Api.Application.Services.Interfaces;
using MediatR;

namespace Kongres.Api.Application.Handlers.Users.Participant
{
    public class GetInfoForAddWorkCommand : IRequestHandler<GetInfoForAddWorkQuery, string>
    {
        private readonly IUserService _userService;

        public GetInfoForAddWorkCommand(IUserService userService)
        {
            _userService = userService;
        }

        public async Task<string> Handle(GetInfoForAddWorkQuery request, CancellationToken cancellationToken)
            => await _userService.GetUserName(request.UserId);
    }
}

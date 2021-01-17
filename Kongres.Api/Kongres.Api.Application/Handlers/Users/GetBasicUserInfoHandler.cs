using System.Threading;
using System.Threading.Tasks;
using Kongres.Api.Application.Queries.Users;
using Kongres.Api.Application.Services.Interfaces;
using Kongres.Api.Domain.DTOs;
using MediatR;

namespace Kongres.Api.Application.Handlers.Users
{
    public class GetBasicUserInfoHandler : IRequestHandler<GetBasicUserInfoQuery, HeaderUserInfoDto>
    {
        private readonly IUserService _userService;

        public GetBasicUserInfoHandler(IUserService userService)
        {
            _userService = userService;
        }

        public async Task<HeaderUserInfoDto> Handle(GetBasicUserInfoQuery request, CancellationToken cancellationToken)
            => await _userService.GetUserInfoForHeaderAsync(request.UserId);
    }
}

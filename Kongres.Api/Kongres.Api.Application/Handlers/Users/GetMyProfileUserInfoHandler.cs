using System.Threading;
using System.Threading.Tasks;
using Kongres.Api.Application.Queries.Users;
using Kongres.Api.Application.Services.Interfaces;
using Kongres.Api.Domain.DTOs;
using MediatR;

namespace Kongres.Api.Application.Handlers.Users
{
    public class GetMyProfileUserInfoHandler : IRequestHandler<GetInformationForMyProfileQuery, MyProfileUserDto>
    {
        private readonly IUserService _userService;

        public GetMyProfileUserInfoHandler(IUserService userService)
        {
            _userService = userService;
        }

        public async Task<MyProfileUserDto> Handle(GetInformationForMyProfileQuery request, CancellationToken cancellationToken)
            => await _userService.GetInformationForMyProfileAsync(request.UserId);
    }
}

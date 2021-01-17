using Kongres.Api.Domain.DTOs;
using MediatR;

namespace Kongres.Api.Application.Queries.Users
{
    public class GetBasicUserInfoQuery : IRequest<HeaderUserInfoDto>
    {
        public string UserId { get; set; }
    }
}

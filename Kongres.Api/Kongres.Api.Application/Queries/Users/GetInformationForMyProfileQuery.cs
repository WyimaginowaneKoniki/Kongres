using Kongres.Api.Domain.DTOs;
using MediatR;

namespace Kongres.Api.Application.Queries.Users
{
    public class GetInformationForMyProfileQuery : IRequest<MyProfileUserDto>
    {
        public string UserId { get; set; }
    }
}

using MediatR;

namespace Kongres.Api.Application.Queries.Users
{
    public class GetInfoForAddWorkQuery : IRequest<string>
    {
        public string UserId { get; set; }
    }
}

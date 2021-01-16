using MediatR;

namespace Kongres.Api.Application.Queries.Users
{
    public class ConfirmUserQuery : IRequest
    { 
        public uint UserId { get; set; }
        public string ConfirmToken { get; set; }
    }
}

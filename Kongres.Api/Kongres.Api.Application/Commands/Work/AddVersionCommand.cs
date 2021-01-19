using MediatR;
using Microsoft.AspNetCore.Http;

namespace Kongres.Api.Application.Commands.Work
{
    public class AddVersionCommand : IRequest
    {
        public string UserId { get; set; }
        public IFormFile NewVersion { get; set; }
    }
}

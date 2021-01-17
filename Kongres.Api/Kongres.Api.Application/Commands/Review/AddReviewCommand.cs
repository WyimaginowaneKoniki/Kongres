using MediatR;
using Microsoft.AspNetCore.Http;

namespace Kongres.Api.Application.Commands.Review
{
    public class AddReviewCommand : IRequest
    {
        public string UserId { get; set; }
        public string ReviewMsg { get; set; }
        public IFormFile ReviewFile { get; set; }
        public byte Rating { get; set; }
        public uint ScientificWorkId { get; set; }
    }
}

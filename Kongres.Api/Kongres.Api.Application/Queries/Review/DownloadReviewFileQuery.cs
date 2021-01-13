using MediatR;
using System.IO;

namespace Kongres.Api.Application.Queries.Review
{
    public class DownloadReviewFileQuery : IRequest<Stream>
    {
        public string UserId { get; set; }
        public uint ReviewId { get; set; }
    }
}

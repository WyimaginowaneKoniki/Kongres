using MediatR;
using System.IO;

namespace Kongres.Api.Application.Queries.Work
{
    public class DownloadScientificWorkQuery : IRequest<Stream>
    {
        public uint WorkId { get; set; }
    }
}

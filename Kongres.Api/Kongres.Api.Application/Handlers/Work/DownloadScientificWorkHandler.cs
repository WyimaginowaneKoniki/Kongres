using Kongres.Api.Application.Queries.Work;
using Kongres.Api.Application.Services.Interfaces;
using MediatR;
using System.IO;
using System.Threading;
using System.Threading.Tasks;

namespace Kongres.Api.Application.Handlers.Work
{
    public class DownloadScientificWorkHandler : IRequestHandler<DownloadScientificWorkQuery, Stream>
    {
        private readonly IScientificWorkService _scientificWorkService;

        public DownloadScientificWorkHandler(IScientificWorkService scientificWorkService)
        {
            _scientificWorkService = scientificWorkService;
        }

        public async Task<Stream> Handle(DownloadScientificWorkQuery request, CancellationToken cancellationToken)
            => await _scientificWorkService.GetStreamOfScientificWorkAsync(request.ScientificWorkId);
    }
}

using System.Threading;
using System.Threading.Tasks;
using Kongres.Api.Application.Queries.Work;
using Kongres.Api.Application.Services.Interfaces;
using Kongres.Api.Domain.DTOs;
using MediatR;

namespace Kongres.Api.Application.Handlers.Work
{
    public class GetWorkHandler : IRequestHandler<GetWorkQuery, ScientificWorkWithReviewDto>
    {
        private readonly IScientificWorkService _scientificWorkService;

        public GetWorkHandler(IScientificWorkService scientificWorkService)
        {
            _scientificWorkService = scientificWorkService;
        }

        public async Task<ScientificWorkWithReviewDto> Handle(GetWorkQuery request, CancellationToken cancellationToken)
            => await _scientificWorkService.GetWorkByIdAsync(request.UserId, request.ScientificWorkId);
    }
}

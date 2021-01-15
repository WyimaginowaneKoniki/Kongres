using Kongres.Api.Application.Queries.Work;
using Kongres.Api.Application.Services.Interfaces;
using Kongres.Api.Domain.DTOs;
using MediatR;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Kongres.Api.Application.Handlers.Work
{
    public class GetApprovedWorksHandler : IRequestHandler<GetApprovedWorksQuery, IEnumerable<ScientificWorkDto>>
    {
        private readonly IScientificWorkService _scientificWorkService;

        public GetApprovedWorksHandler(IScientificWorkService scientificWorkService)
        {
            _scientificWorkService = scientificWorkService;
        }

        public async Task<IEnumerable<ScientificWorkDto>> Handle(GetApprovedWorksQuery request, CancellationToken cancellationToken)
            => await _scientificWorkService.GetApprovedWorksAsync();
    }
}

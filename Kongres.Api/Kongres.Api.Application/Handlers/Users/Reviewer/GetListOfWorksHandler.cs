using Kongres.Api.Application.Commands.Users.Reviewer;
using Kongres.Api.Application.Services.Interfaces;
using Kongres.Api.Domain.DTOs;
using MediatR;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Kongres.Api.Application.Handlers.Users.Reviewer
{
    public class GetListOfWorksHandler : IRequestHandler<GetListOfWorksCommand, IEnumerable<ScientificWorkWithStatusDto>>
    {
        private readonly IScientificWorkService _scientificWorkRepository;

        public GetListOfWorksHandler(IScientificWorkService scientificWorkService)
        {
            _scientificWorkRepository = scientificWorkService;
        }

        public async Task<IEnumerable<ScientificWorkWithStatusDto>> Handle(GetListOfWorksCommand request, CancellationToken cancellationToken)
        {
            var reviewerId = uint.Parse(request.ReviewerId);

            return await _scientificWorkRepository.GetListOfWorksForReviewer(reviewerId);
        }
    }
}

using Kongres.Api.Application.Commands.Work;
using Kongres.Api.Application.Services.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace Kongres.Api.Application.Handlers.Work
{
    public class AddWorkHandler : AsyncRequestHandler<AddWorkCommand>
    {
        private readonly IScientificWorkService _scientificWorkService;

        public AddWorkHandler(IScientificWorkService scientificWorkService)
        {
            _scientificWorkService = scientificWorkService;
        }

        protected override async Task Handle(AddWorkCommand request, CancellationToken cancellationToken)
        {

            await _scientificWorkService.AddBasicInfoAsync(request.AuthorId,
                                                            request.Title,
                                                            request.Description,
                                                            request.Authors);

            var userId = uint.Parse(request.AuthorId);

            await _scientificWorkService.AddVersionAsync(userId, request.Work, 1);
        }
    }
}

using Kongres.Api.Application.Commands.Work;
using Kongres.Api.Application.Services.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace Kongres.Api.Application.Handlers.Work
{
    public class AddVersionHandler : AsyncRequestHandler<AddVersionCommand>
    {
        private readonly IScientificWorkService _scientificWorkService;

        public AddVersionHandler(IScientificWorkService scientificWorkService)
        {
            _scientificWorkService = scientificWorkService;
        }

        protected override async Task Handle(AddVersionCommand request, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();
            var userId = uint.Parse(request.UserId);
            await _scientificWorkService.AddVersionAsync(userId, request.NewVersion);
        }
    }
}

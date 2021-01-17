using Kongres.Api.Application.Commands.Work;
using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;
using Kongres.Api.Application.Services;

namespace Kongres.Api.Application.Handlers.Work
{
    public class AddVersionHandler : AsyncRequestHandler<AddVersionCommand>
    {
        private readonly ScientificWorkService _scientificWorkService;

        public AddVersionHandler(ScientificWorkService scientificWorkService)
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

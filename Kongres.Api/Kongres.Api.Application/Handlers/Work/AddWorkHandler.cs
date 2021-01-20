using Kongres.Api.Application.Commands.Work;
using Kongres.Api.Application.Services.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace Kongres.Api.Application.Handlers.Work
{
    public class AddWorkHandler : IRequestHandler<AddWorkCommand, uint>
    {
        private readonly IScientificWorkService _scientificWorkService;

        public AddWorkHandler(IScientificWorkService scientificWorkService)
        {
            _scientificWorkService = scientificWorkService;
        }

        public async Task<uint> Handle(AddWorkCommand request, CancellationToken cancellationToken)
        {
            // JSON doesn't know what is null :C
            if (request.Authors == "null")
                request.Authors = null;

            var authorId = uint.Parse(request.AuthorId);

            var scientificWorkId = await _scientificWorkService.AddBasicInfoAsync(authorId,
                                                                                    request.Title,
                                                                                    request.Description,
                                                                                    request.Authors,
                                                                                    request.Specialization);
            
            await _scientificWorkService.AddVersionAsync(authorId, request.Work, true);

            return scientificWorkId;
        }
    }
}

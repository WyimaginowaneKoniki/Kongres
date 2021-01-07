using Kongres.Api.Application.Commands.Work;
using Kongres.Api.Domain.Entities;
using Kongres.Api.Domain.Enums;
using Kongres.Api.Infrastructure.Repositories.Interfaces;
using MediatR;
using Microsoft.AspNetCore.Identity;
using System;
using System.Threading;
using System.Threading.Tasks;
using Kongres.Api.Infrastructure;

namespace Kongres.Api.Application.Handlers.Work
{
    public class AddWorkHandler : AsyncRequestHandler<AddWorkCommand>
    {
        private readonly IScientificWorkRepository _scientificWorkRepository;
        private readonly IScientificWorkFileRepository _scientificWorkFileRepository;
        private readonly UserManager<User> _userManager;
        private readonly IFileManager _fileManager;

        public AddWorkHandler(IScientificWorkRepository scientificWorkRepository,
                                IScientificWorkFileRepository scientificWorkFileRepository,
                                UserManager<User> userManager,
                                IFileManager fileManager)
        {
            _scientificWorkRepository = scientificWorkRepository;
            _scientificWorkFileRepository = scientificWorkFileRepository;
            _userManager = userManager;
            _fileManager = fileManager;
        }

        protected override async Task Handle(AddWorkCommand request, CancellationToken cancellationToken)
        {
            var user = await _userManager.FindByIdAsync(request.AuthorId);
            var creationDate = DateTime.UtcNow;

            var scientificWork = new ScienceWork()
            {
                Name = request.Title,
                Description = request.Description,
                MainAuthor = user,
                OtherAuthors = request.Authors,
                CreationDate = creationDate,
                Status = StatusEnum.WaitingForReview
            };

            // Add basic information about work
            await _scientificWorkRepository.AddAsync(scientificWork);

            // Add first version of work
            var workName = await _fileManager.SaveFileAsync(request.Work);
            var versionOfWork = new ScienceWorkFile()
            {
                Version = 1,
                FileName = workName,
                DateAdd = creationDate,
                ScienceWork = scientificWork
            };

            await _scientificWorkFileRepository.AddAsync(versionOfWork);
        }
    }
}

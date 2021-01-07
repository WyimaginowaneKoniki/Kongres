using Kongres.Api.Application.Commands.Work;
using Kongres.Api.Domain.Entities;
using Kongres.Api.Domain.Enums;
using Kongres.Api.Infrastructure.Repositories.Interfaces;
using MediatR;
using Microsoft.AspNetCore.Identity;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Kongres.Api.Application.Handlers.Work
{
    public class AddWorkHandler : AsyncRequestHandler<AddWorkCommand>
    {
        private readonly IScientificWorkRepository _scientificWorkRepository;
        private readonly UserManager<User> _userManager;

        public AddWorkHandler(IScientificWorkRepository scientificWorkRepository, UserManager<User> userManager)
        {
            _scientificWorkRepository = scientificWorkRepository;
            _userManager = userManager;
        }

        protected override async Task Handle(AddWorkCommand request, CancellationToken cancellationToken)
        {
            var user = await _userManager.FindByIdAsync(request.AuthorId);

            var scientificWork = new ScienceWork()
            {
                Name = request.Title,
                Description = request.Description,
                MainAuthor = user,
                OtherAuthors = request.Authors,
                CreationDate = DateTime.UtcNow,
                Status = StatusEnum.WaitingForReview
            };

            // Add basic information about work
            await _scientificWorkRepository.AddWork(scientificWork);

            // Add first version of work
        }
    }
}

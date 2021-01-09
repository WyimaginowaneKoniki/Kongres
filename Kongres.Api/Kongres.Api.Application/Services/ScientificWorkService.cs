using Kongres.Api.Application.Services.Interfaces;
using Kongres.Api.Domain.Entities;
using Kongres.Api.Domain.Enums;
using Kongres.Api.Infrastructure;
using Kongres.Api.Infrastructure.Repositories.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using System;
using System.Threading.Tasks;

namespace Kongres.Api.Application.Services
{
    public class ScientificWorkService : IScientificWorkService
    {
        private readonly IScientificWorkRepository _scientificWorkRepository;
        private readonly IScientificWorkFileRepository _scientificWorkFileRepository;
        private readonly UserManager<User> _userManager;
        private readonly IFileManager _fileManager;

        public ScientificWorkService(IScientificWorkRepository scientificWorkRepository,
                                    IScientificWorkFileRepository scientificWorkFileRepository,
                                    UserManager<User> userManager,
                                    IFileManager fileManager)
        {
            _scientificWorkRepository = scientificWorkRepository;
            _scientificWorkFileRepository = scientificWorkFileRepository;
            _userManager = userManager;
            _fileManager = fileManager;
        }

        public async Task AddBasicInfoAsync(string userId, string title, string description, string authors)
        {
            var user = await _userManager.FindByIdAsync(userId);

            var scientificWork = new ScientificWork()
            {
                Name = title,
                Description = description,
                MainAuthor = user,
                OtherAuthors = authors,
                CreationDate = DateTime.UtcNow,
                Status = StatusEnum.WaitingForReview
            };

            await _scientificWorkRepository.AddAsync(scientificWork);
        }

        public async Task AddVersionAsync(uint userId, IFormFile workFile, byte versionNumber = 0)
        {
            var scientificWork = await _scientificWorkRepository.GetByUserIdAsync(userId);

            var workName = await _fileManager.SaveFileAsync(workFile);

            var versionOfWork = new ScientificWorkFile()
            {
                Version = versionNumber,
                FileName = workName,
                DateAdd = DateTime.UtcNow,
                ScientificWork = scientificWork
            };

            await _scientificWorkFileRepository.AddAsync(versionOfWork);
        }
    }
}

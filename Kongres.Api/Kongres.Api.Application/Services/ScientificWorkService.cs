using Kongres.Api.Application.Services.Interfaces;
using Kongres.Api.Domain.DTOs;
using Kongres.Api.Domain.Entities;
using Kongres.Api.Domain.Enums;
using Kongres.Api.Infrastructure;
using Kongres.Api.Infrastructure.Repositories.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
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

        public async Task AddBasicInfoAsync(string userId, string title, string description, string authors,
            string specialization)
        {
            var user = await _userManager.FindByIdAsync(userId);

            var scientificWork = new ScientificWork()
            {
                Name = title,
                Description = description,
                MainAuthor = user,
                OtherAuthors = authors,
                CreationDate = DateTime.UtcNow,
                Status = StatusEnum.WaitingForReview,
                Specialization = specialization
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

        public async Task<IEnumerable<ScientificWorkDto>> GetApprovedWorksAsync()
        {
            var listOfScientificWorks = await _scientificWorkRepository.GetApprovedWorksAsync();

            var listOfScientificWorksDto = new List<ScientificWorkDto>();

            foreach (var scientificWork in listOfScientificWorks)
            {
                var authors = $"{scientificWork.MainAuthor.Name} {scientificWork.MainAuthor.Surname}";

                // Sometimes the work doesn't include other authors except main one
                if (!(scientificWork.OtherAuthors is null))
                    authors += $", {scientificWork.OtherAuthors}";


                var scientificWorkDto = new ScientificWorkDto()
                {
                    Id = scientificWork.Id,
                    Authors = authors,
                    Title = scientificWork.Name,
                    Description = scientificWork.Description,
                    CreationDate = scientificWork.CreationDate,
                    // Get date of latest update of work
                    UpdateDate = scientificWork.Versions.OrderBy(x => x.Version).Last().DateAdd,
                    Specialization = scientificWork.Specialization
                };

                listOfScientificWorksDto.Add(scientificWorkDto);
            }

            return listOfScientificWorksDto;
        }

        public async Task<Stream> GetStreamOfScientificWorkAsync(uint workId)
        {
            var scientificWork = await _scientificWorkFileRepository.GetNewestVersionAsync(workId);
            if (scientificWork is null)
                return null;

            return await Task.FromResult(_fileManager.GetStreamOfFile(scientificWork.FileName));
        }

        public async Task<ScientificWorkWithReviewDto> GetWorkByIdAsync(uint scientificWorkId)
        {
            // TODO: If science work is approved

            var scientificWork = await _scientificWorkRepository.GetWorkByIdAsync(scientificWorkId);
            if (scientificWork is null)
                return null;

            var scientificWorkDto = new ScientificWorkDto()
            {
                Id = scientificWork.Id,
                Title = scientificWork.Name,
                Description = scientificWork.Description,
                Specialization = scientificWork.Specialization,
                CreationDate = scientificWork.CreationDate,
                UpdateDate = scientificWork.Versions.OrderBy(x => x.Version).Last().DateAdd,
                Authors = scientificWork.OtherAuthors,
            };

            var authorPhoto = await _fileManager.GetBase64FileAsync(scientificWork.MainAuthor.Photo);
            var photoExtension = scientificWork.MainAuthor.Photo.Split(".")[^1];

            var mainAuthor = new UserDto()
            {
                Name = $"{scientificWork.MainAuthor.Name} {scientificWork.MainAuthor.Surname}",
                Specialization = scientificWork.MainAuthor.Specialization,
                University = scientificWork.MainAuthor.University,
                Photo = $"data:image/{photoExtension};base64,{authorPhoto}"
            };

            var scientificWorkWithReviewDto = new ScientificWorkWithReviewDto()
            {
                ScientificWork = scientificWorkDto,
                MainAuthor = mainAuthor
            };

            return await Task.FromResult(scientificWorkWithReviewDto);
        }
    }
}

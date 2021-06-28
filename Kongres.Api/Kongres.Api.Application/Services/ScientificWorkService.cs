using AutoMapper;
using Kongres.Api.Application.Helpers;
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
using System.Security.Authentication;
using System.Threading.Tasks;

namespace Kongres.Api.Application.Services
{
    public class ScientificWorkService : IScientificWorkService
    {
        private readonly IScientificWorkRepository _scientificWorkRepository;
        private readonly IScientificWorkFileRepository _scientificWorkFileRepository;
        private readonly IReviewerScientificWorkRepository _reviewersWorkRepository;
        private readonly UserManager<User> _userManager;
        private readonly IFileManager _fileManager;
        private readonly IEmailSender _emailSender;
        private readonly IMapper _mapper;

        public ScientificWorkService(IScientificWorkRepository scientificWorkRepository,
                                    IScientificWorkFileRepository scientificWorkFileRepository,
                                    IReviewerScientificWorkRepository reviewersWorkRepository,
                                    UserManager<User> userManager,
                                    IFileManager fileManager,
                                    IEmailSender emailSender,
                                    IMapper mapper)
        {
            _scientificWorkRepository = scientificWorkRepository;
            _scientificWorkFileRepository = scientificWorkFileRepository;
            _userManager = userManager;
            _fileManager = fileManager;
            _emailSender = emailSender;
            _reviewersWorkRepository = reviewersWorkRepository;
            _mapper = mapper;
        }

        public async Task<uint> AddBasicInfoAsync(uint authorId, string title, string description, string authors,
            string specialization)
        {
            var user = await _userManager.FindByIdAsync(authorId.ToString());

            if (UserHelper.GetRole(user) != nameof(UserTypeEnum.Participant))
                throw new AuthenticationException();

            var scientificWork = await _scientificWorkRepository.GetByAuthorIdAsync(authorId);

            if (!(scientificWork is null))
                throw new InvalidOperationException();

            scientificWork = new ScientificWork()
            {
                Name = title,
                Description = description,
                MainAuthor = user,
                OtherAuthors = authors,
                CreationDate = DateTime.Now,
                Status = StatusEnum.WaitingForDrawOfReviewers,
                Specialization = specialization
            };

            await _scientificWorkRepository.AddAsync(scientificWork);

            return await _scientificWorkRepository.GetIdOfWorkByAuthorIdAsync(authorId);
        }

        public async Task AddVersionAsync(uint userId, IFormFile workFile, bool isFirstVersion = false)
        {
            byte versionNumber = 1;
            if (!isFirstVersion)
            {
                versionNumber = await _scientificWorkRepository.GetNumberOfVersionsByAuthorIdAsync(userId);
                versionNumber++;
            }

            var scientificWork = await _scientificWorkRepository.GetByAuthorIdAsync(userId);

            var workName = await _fileManager.SaveFileAsync(workFile);

            var versionOfWork = new ScientificWorkFile()
            {
                Version = versionNumber,
                FileName = workName,
                DateAdd = DateTime.Now,
                ScientificWork = scientificWork
            };

            await _scientificWorkFileRepository.AddAsync(versionOfWork);

            // change status when the work reviewed before 
            if (!isFirstVersion)
            {
                scientificWork.Status = StatusEnum.UnderReview;
                await _scientificWorkRepository.ChangeStatusAsync(scientificWork);

                var emailsOfReviewers = await _reviewersWorkRepository.GetEmailsOfReviewersByWorkIdAsync(scientificWork.Id);
                foreach (var email in emailsOfReviewers)
                {
                    await _emailSender.SendAddedNewVersionEmailAsync(email, scientificWork.Id);
                }
            }
        }

        public async Task<IEnumerable<ScientificWorkDto>> GetApprovedWorksAsync()
        {
            var listOfScientificWorks = await _scientificWorkRepository.GetApprovedWorksAsync();

            return listOfScientificWorks.Select(x => _mapper.Map<ScientificWorkDto>(x));
        }

        public async Task<Stream> GetStreamOfScientificWorkAsync(uint workId)
        {
            var scientificWork = await _scientificWorkFileRepository.GetNewestVersionAsync(workId);
            if (scientificWork is null)
                return null;

            return _fileManager.GetStreamOfFile(scientificWork.FileName);
        }

        public async Task<ScientificWorkWithReviewDto> GetWorkByIdAsync(uint userId, uint scientificWorkId)
        {
            var scientificWork = await _scientificWorkRepository.GetWorkByIdAsync(scientificWorkId);
            if (scientificWork is null)
                return null;

            var mode = "";

            if (scientificWork.MainAuthor.Id == userId)
                mode = "Author";
            else if (await _reviewersWorkRepository.IsReviewerAsync(scientificWorkId, userId))
                mode = nameof(UserTypeEnum.Reviewer);
            else
                mode = nameof(UserTypeEnum.Participant);

            // participant can see this work only when it's approved
            if (scientificWork.Status != StatusEnum.Accepted && mode == nameof(UserTypeEnum.Participant))
                throw new AuthenticationException();

            var scientificWorkDto = _mapper.Map<ScientificWorkWithOtherAuthorsDto>(scientificWork);

            var mainAuthor = _mapper.Map<UserDto>(scientificWork.MainAuthor);
            mainAuthor.Photo = UserHelper.GetBase64Photo(_fileManager, mainAuthor.Photo);

            List<VersionDto> versionsDto = null;

            // normal user should not see reviews
            if (mode != nameof(UserTypeEnum.Participant))
            {
                var versions = await _scientificWorkFileRepository.GetVersionsWithReviews(scientificWorkId);

                // reviewer should see only own reviews and answers to these reviews
                if (mode == nameof(UserTypeEnum.Reviewer))
                    versions.ToList().ForEach(x => x.Reviews = x.Reviews.Where(x => x.Reviewer.Id != userId));

                versionsDto = _mapper.Map<List<VersionDto>>(versions);
            }

            return new ScientificWorkWithReviewDto()
            {
                ScientificWork = scientificWorkDto,
                MainAuthor = mainAuthor,
                Mode = mode,
                Versions = versionsDto,
                Status = scientificWork.Status.ToString()
            };
        }

        public async Task<IEnumerable<ScientificWorkWithStatusDto>> GetListOfWorksForReviewer(uint reviewerId)
        {
            var user = await _userManager.FindByIdAsync(reviewerId.ToString());

            if (UserHelper.GetRole(user) != nameof(UserTypeEnum.Reviewer))
                throw new AuthenticationException();

            var scientificWorks = await _reviewersWorkRepository.GetListOfWorksForReviewerAsync(reviewerId);

            return scientificWorks.Select(x => _mapper.Map<ScientificWorkWithStatusDto>(x));
        }
    }
}

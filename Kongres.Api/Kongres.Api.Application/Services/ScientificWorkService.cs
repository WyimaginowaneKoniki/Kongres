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
        private readonly IReviewRepository _reviewRepository;
        private readonly UserManager<User> _userManager;
        private readonly IFileManager _fileManager;
        private readonly IEmailSender _emailSender;

        public ScientificWorkService(IScientificWorkRepository scientificWorkRepository,
                                    IScientificWorkFileRepository scientificWorkFileRepository,
                                    IReviewerScientificWorkRepository reviewersWorkRepository,
                                    IReviewRepository reviewRepository,
                                    UserManager<User> userManager,
                                    IFileManager fileManager,
                                    IEmailSender emailSender)
        {
            _scientificWorkRepository = scientificWorkRepository;
            _scientificWorkFileRepository = scientificWorkFileRepository;
            _reviewRepository = reviewRepository;
            _userManager = userManager;
            _fileManager = fileManager;
            _emailSender = emailSender;
            _reviewersWorkRepository = reviewersWorkRepository;
        }

        public async Task<uint> AddBasicInfoAsync(uint authorId, string title, string description, string authors,
            string specialization)
        {
            var user = await _userManager.FindByIdAsync(authorId.ToString());

            if (user.NormalizedUserName.Split(":")[0] != "PARTICIPANT")
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

            return listOfScientificWorks.Select(x => new ScientificWorkDto()
            {
                Id = x.Id,
                Authors = GetAuthors(x.MainAuthor, x.OtherAuthors),
                Title = x.Name,
                Description = x.Description,
                CreationDate = x.CreationDate.ToString("g"),
                // Get date of latest update of work
                UpdateDate = x.Versions.OrderBy(x => x.Version).Last().DateAdd.ToString("g"),
                Specialization = x.Specialization
            });
        }

        public async Task<Stream> GetStreamOfScientificWorkAsync(uint workId)
        {
            var scientificWork = await _scientificWorkFileRepository.GetNewestVersionAsync(workId);
            if (scientificWork is null)
                return null;

            return await Task.FromResult(_fileManager.GetStreamOfFile(scientificWork.FileName));
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
                mode = "Reviewer";
            else
                mode = "Participant";

            // participant can see this work only when it's approved
            if (scientificWork.Status != StatusEnum.Accepted && mode == "Participant")
                throw new AuthenticationException();

            var scientificWorkDto = new ScientificWorkDto()
            {
                Id = scientificWork.Id,
                Title = scientificWork.Name,
                Description = scientificWork.Description,
                Specialization = scientificWork.Specialization,
                CreationDate = scientificWork.CreationDate.ToString("g"),
                UpdateDate = scientificWork.Versions.OrderBy(x => x.Version).Last().DateAdd.ToString("g"),
                Authors = scientificWork.OtherAuthors,
            };

            string base64Photo = null;

            if (scientificWork.MainAuthor.Photo != null)
            {
                var authorPhoto = await _fileManager.GetBase64FileAsync(scientificWork.MainAuthor.Photo);
                var photoExtension = scientificWork.MainAuthor.Photo.Split(".")[^1];
                base64Photo = $"data:image/{photoExtension};base64,{authorPhoto}";
            }

            var mainAuthor = new UserDto()
            {
                Name = $"{scientificWork.MainAuthor.Name} {scientificWork.MainAuthor.Surname}",
                Degree = scientificWork.MainAuthor.Degree,
                University = scientificWork.MainAuthor.University,
                Photo = base64Photo
            };

            List<VersionDto> versionsDto = null;

            // normal user should not see reviews
            if (mode != "Participant")
            {
                var versions = await _scientificWorkFileRepository.GetVersionsWithReviews(scientificWorkId);

                versionsDto = new List<VersionDto>();

                // every version of work includes reviews
                foreach (var version in versions)
                {
                    var reviewsDto = new List<ReviewDto>();

                    foreach (var review in version.Reviews)
                    {
                        // reviewer should see only own reviews and answers to these reviews
                        if (mode == "Reviewer" && review.Reviewer.Id != userId)
                            continue;

                        reviewsDto.Add(new ReviewDto()
                        {
                            Id = review.Id,
                            ReviewDate = review.DateReview.ToString("g"),
                            ReviewMsg = review.Comment,
                            IsReviewFileExist = review.File != null,
                            Rating = review.Rating,
                            AnswerDate = review?.Answer?.AnswerDate.ToString("g"),
                            AnswerMsg = review?.Answer?.Comment
                        });
                    }

                    versionsDto.Add(new VersionDto()
                    {
                        Date = version.DateAdd.ToString("g"),
                        VersionNumber = version.Version,
                        Reviews = reviewsDto,
                        Rating = version.Rating
                    });
                }
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

            if (user.NormalizedUserName.Split(":")[0] != "REVIEWER")
                throw new AuthenticationException();

            var scientificWorks = await _reviewersWorkRepository.GetListOfWorksForReviewerAsync(reviewerId);

            return scientificWorks.Select(x => new ScientificWorkWithStatusDto()
            {
                Id = x.Id,
                Title = x.Name,
                Description = x.Description,
                Authors = GetAuthors(x.MainAuthor, x.OtherAuthors),
                Specialization = x.Specialization,
                CreationDate = x.CreationDate.ToString("g"),
                UpdateDate = x.Versions.OrderBy(x => x.Version).Last().DateAdd.ToString("g"),
                Status = x.Status.ToString()
            });
        }

        // Get string of authors
        // returns only one author when there is no otherAuthors
        // otherwise returns author's names divided by ','
        private string GetAuthors(User mainAuthor, string otherAuthors)
        {
            var authors = $"{mainAuthor.Name} {mainAuthor.Surname}";

            // Sometimes the work doesn't include other authors except main one
            if (!(otherAuthors is null))
                authors += $", {otherAuthors}";

            return authors;
        }
    }
}

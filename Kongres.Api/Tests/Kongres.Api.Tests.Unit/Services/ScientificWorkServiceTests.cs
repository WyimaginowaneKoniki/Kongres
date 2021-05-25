using AutoMapper;
using Bogus;
using FluentAssertions;
using Kongres.Api.Application.Mappers.Profiles;
using Kongres.Api.Application.Services;
using Kongres.Api.Application.Services.Interfaces;
using Kongres.Api.Domain.DTOs;
using Kongres.Api.Domain.Entities;
using Kongres.Api.Domain.Enums;
using Kongres.Api.Infrastructure;
using Kongres.Api.Infrastructure.Repositories.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Moq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Authentication;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Xunit;

namespace Kongres.Api.Tests.Unit.Services
{
    public class ScientificWorkServiceTests : IDisposable
    {
        private readonly Mock<IScientificWorkRepository> _scientificWorkRepositoryMock = new Mock<IScientificWorkRepository>();
        private readonly Mock<IScientificWorkFileRepository> _scientificWorkFileRepositoryMock = new Mock<IScientificWorkFileRepository>();
        private readonly Mock<IReviewerScientificWorkRepository> _reviewerScientificWorkRepositoryMock = new Mock<IReviewerScientificWorkRepository>();
        private readonly Mock<IFileManager> _fileManagerMock = new Mock<IFileManager>();
        private readonly Mock<IEmailSender> _emailSenderMock = new Mock<IEmailSender>();
        private readonly Mock<IUserStore<User>> _userStoreMock = new Mock<IUserStore<User>>();
        private readonly UserManager<User> _userManager;
        private readonly ScientificWorkService _service;
        private readonly Faker _faker = new Faker();
        private readonly IMapper _mapper;

        public ScientificWorkServiceTests()
        {
            _userManager = new UserManager<User>(_userStoreMock.Object, null, null, null, null, null, null, null, null);

            var configuration = new MapperConfiguration(cfg
                => cfg.AddProfile<UserProfile>());

            _mapper = new Mapper(configuration);

            _service = new ScientificWorkService(_scientificWorkRepositoryMock.Object,
                                                _scientificWorkFileRepositoryMock.Object,
                                                _reviewerScientificWorkRepositoryMock.Object,
                                                _userManager,
                                                _fileManagerMock.Object,
                                                _emailSenderMock.Object,
                                                _mapper);
        }

        public void Dispose()
        {
            _scientificWorkRepositoryMock.Reset();
            _scientificWorkFileRepositoryMock.Reset();
            _reviewerScientificWorkRepositoryMock.Reset();
            _fileManagerMock.Reset();
            _emailSenderMock.Reset();
            _userStoreMock.Reset();
        }

        [Fact]
        public async Task AddBasicInfoAsyncAddWToDatabaseWithoutChanges()
        {
            var user = new User()
            {
                Id = 1,
                Name = _faker.Person.FirstName,
                Surname = _faker.Person.LastName,
                NormalizedUserName = NormilizeUsername(nameof(UserTypeEnum.Participant))
            };

            var scientificWorkId = 1u;
            var title = _faker.Commerce.ProductName();
            var description = _faker.Commerce.ProductDescription();
            var authors = string.Join(" ", Enumerable.Range(1, 5).Select(_ => _faker.Person.FullName));
            var specialization = "Mathematics";

            var returnedId = 0u;

            _userStoreMock.Setup(x => x.FindByIdAsync(user.Id.ToString(), CancellationToken.None)).ReturnsAsync(user);

            _scientificWorkRepositoryMock.Setup(x => x.GetByAuthorIdAsync(user.Id)).ReturnsAsync((ScientificWork)null);
            _scientificWorkRepositoryMock.Setup(x => x.AddAsync(It.Is<ScientificWork>(y => y.MainAuthor == user && y.Status == StatusEnum.WaitingForDrawOfReviewers)));
            _scientificWorkRepositoryMock.Setup(x => x.GetIdOfWorkByAuthorIdAsync(user.Id)).ReturnsAsync(scientificWorkId);

            var err = await Record.ExceptionAsync(async
                () => returnedId = await _service.AddBasicInfoAsync(user.Id, title, description, authors, specialization));

            err.Should().BeNull();
            returnedId.Should().Be(scientificWorkId);

            _scientificWorkRepositoryMock.Verify(x => x.AddAsync(It.Is<ScientificWork>(y => y.MainAuthor == user && y.Status == StatusEnum.WaitingForDrawOfReviewers)), Times.Once);
        }

        [Fact]
        public async Task AddBasicInfoAsyncThrowAuthenticationExceptionWhenUserIsNotParticipant()
        {
            var user = new User()
            {
                Id = 1,
                Name = _faker.Person.FirstName,
                Surname = _faker.Person.LastName,
                NormalizedUserName = NormilizeUsername(nameof(UserTypeEnum.Reviewer))
            };

            var title = _faker.Commerce.ProductName();
            var description = _faker.Commerce.ProductDescription();
            var authors = string.Join(" ", Enumerable.Range(1, 5).Select(_ => _faker.Person.FullName));
            var specialization = "Mathematics";

            var returnedId = 0u;

            _userStoreMock.Setup(x => x.FindByIdAsync(user.Id.ToString(), CancellationToken.None)).ReturnsAsync(user);

            var err = await Record.ExceptionAsync(async
                () => returnedId = await _service.AddBasicInfoAsync(user.Id, title, description, authors, specialization));

            err.Should().BeOfType<AuthenticationException>();

            _scientificWorkRepositoryMock.Verify(x => x.AddAsync(It.IsAny<ScientificWork>()), Times.Never);
        }

        [Fact]
        public async Task AddBasicInfoAsyncThrowInvalidOperationExceptionWhenUserAlreadyAddWork()
        {
            var user = new User()
            {
                Id = 1,
                Name = _faker.Person.FirstName,
                Surname = _faker.Person.LastName,
                NormalizedUserName = NormilizeUsername(nameof(UserTypeEnum.Participant))
            };

            var title = _faker.Commerce.ProductName();
            var description = _faker.Commerce.ProductDescription();
            var authors = string.Join(" ", Enumerable.Range(1, 5).Select(_ => _faker.Person.FullName));
            var specialization = "Mathematics";

            var returnedId = 0u;

            _userStoreMock.Setup(x => x.FindByIdAsync(user.Id.ToString(), CancellationToken.None)).ReturnsAsync(user);
            _scientificWorkRepositoryMock.Setup(x => x.GetByAuthorIdAsync(user.Id)).ReturnsAsync(new ScientificWork());

            var err = await Record.ExceptionAsync(async
                () => returnedId = await _service.AddBasicInfoAsync(user.Id, title, description, authors, specialization));

            err.Should().BeOfType<InvalidOperationException>();

            _scientificWorkRepositoryMock.Verify(x => x.AddAsync(It.IsAny<ScientificWork>()), Times.Never);
        }

        [Fact]
        public async Task AddVersionAsyncAddFirstSuccess()
        {
            var userId = 1u;
            var file = new FormFile(null, _faker.Random.Long(), _faker.Random.Long(), _faker.Internet.UserName(), _faker.System.FileName("pdf"));

            var randomNameOfFile = _faker.System.FileName("pdf");

            var scientificWork = new ScientificWork()
            {
                Id = 1,
                Name = _faker.Commerce.ProductName(),
                Description = _faker.Commerce.ProductDescription(),
                Status = StatusEnum.WaitingForDrawOfReviewers
            };

            var newVersion = new ScientificWorkFile()
            {
                Version = 1,
                FileName = randomNameOfFile,
                ScientificWork = scientificWork
            };

            _scientificWorkRepositoryMock.Setup(x => x.GetByAuthorIdAsync(userId)).ReturnsAsync(scientificWork);
            _fileManagerMock.Setup(x => x.SaveFileAsync(file)).ReturnsAsync(randomNameOfFile);
            _scientificWorkFileRepositoryMock.Setup(x => x.AddAsync(It.Is<ScientificWorkFile>(y => y.Version == newVersion.Version &&
                                                                                              y.FileName == newVersion.FileName &&
                                                                                              y.ScientificWork == newVersion.ScientificWork)));

            var err = await Record.ExceptionAsync(async
                () => await _service.AddVersionAsync(userId, file, true));

            err.Should().BeNull();

            _scientificWorkRepositoryMock.Verify(x => x.ChangeStatusAsync(It.IsAny<ScientificWork>()), Times.Never);
            _scientificWorkRepositoryMock.Verify(x => x.GetNumberOfVersionsByAuthorIdAsync(It.IsAny<uint>()), Times.Never);
            _emailSenderMock.Verify(x => x.SendAddedNewVersionEmailAsync(It.IsAny<string>(), It.IsAny<uint>()), Times.Never);
            _scientificWorkFileRepositoryMock.Verify(x => x.AddAsync(It.Is<ScientificWorkFile>(y => y.Version == newVersion.Version &&
                                                                                              y.FileName == newVersion.FileName &&
                                                                                              y.ScientificWork == newVersion.ScientificWork)), Times.Once);
        }

        [Fact]
        public async Task AddVersionAsyncAddNextVersionsSuccess()
        {
            uint userId = 1;
            var file = new FormFile(null, _faker.Random.Long(), _faker.Random.Long(), _faker.Internet.UserName(), _faker.System.FileName("pdf"));

            var randomNameOfFile = _faker.System.FileName("pdf");

            byte versionNumber = 1;

            var scientificWork = new ScientificWork()
            {
                Id = 1,
                Name = _faker.Commerce.ProductName(),
                Description = _faker.Commerce.ProductDescription(),
                Status = StatusEnum.UnderReview
            };

            var newVersion = new ScientificWorkFile()
            {
                Version = (byte)(versionNumber + 1),
                FileName = randomNameOfFile,
                ScientificWork = scientificWork
            };

            var reviewerEmails = Enumerable.Range(1, 3).Select(_ => _faker.Internet.Email());

            _scientificWorkRepositoryMock.Setup(x => x.GetNumberOfVersionsByAuthorIdAsync(userId)).ReturnsAsync(versionNumber);
            _scientificWorkRepositoryMock.Setup(x => x.GetByAuthorIdAsync(userId)).ReturnsAsync(scientificWork);
            _scientificWorkRepositoryMock.Setup(x => x.ChangeStatusAsync(It.Is<ScientificWork>(y => y.Id == scientificWork.Id && y.Status == StatusEnum.UnderReview)));

            _reviewerScientificWorkRepositoryMock.Setup(x => x.GetEmailsOfReviewersByWorkIdAsync(scientificWork.Id)).ReturnsAsync(reviewerEmails);

            _scientificWorkFileRepositoryMock.Setup(x => x.AddAsync(It.Is<ScientificWorkFile>(y => y.Version == newVersion.Version &&
                                                                                                   y.FileName == newVersion.FileName &&
                                                                                                   y.ScientificWork == newVersion.ScientificWork)));

            _fileManagerMock.Setup(x => x.SaveFileAsync(file)).ReturnsAsync(randomNameOfFile);
            _emailSenderMock.Setup(x => x.SendAddedNewVersionEmailAsync(It.IsIn(reviewerEmails), scientificWork.Id));

            var err = await Record.ExceptionAsync(async
                            () => await _service.AddVersionAsync(userId, file));

            err.Should().BeNull();

            _scientificWorkRepositoryMock.Verify(x => x.ChangeStatusAsync(It.Is<ScientificWork>(x => x.Status == StatusEnum.UnderReview)), Times.Once);
            _scientificWorkRepositoryMock.Verify(x => x.GetNumberOfVersionsByAuthorIdAsync(userId), Times.Once);
            _scientificWorkFileRepositoryMock.Verify(x => x.AddAsync(It.Is<ScientificWorkFile>(y => y.Version == newVersion.Version &&
                                                                                                    y.FileName == newVersion.FileName &&
                                                                                                    y.ScientificWork == newVersion.ScientificWork)), Times.Once);

            _emailSenderMock.Verify(x => x.SendAddedNewVersionEmailAsync(It.IsAny<string>(), scientificWork.Id), Times.Exactly(reviewerEmails.Count()));
        }

        [Fact]
        public async Task GetApprovedWorksAsyncReturnNullWhenDbDoesNotContainApprovedWorks()
        {
            var expectedList = Enumerable.Empty<ScientificWorkDto>();
            IEnumerable<ScientificWorkDto> returnedScientificWorks = null;

            _scientificWorkRepositoryMock.Setup(x => x.GetApprovedWorksAsync()).ReturnsAsync(Enumerable.Empty<ScientificWork>());

            var err = await Record.ExceptionAsync(async
                () => returnedScientificWorks = await _service.GetApprovedWorksAsync());

            err.Should().BeNull();
            returnedScientificWorks.Should().BeEquivalentTo(expectedList);

            _scientificWorkRepositoryMock.Verify(x => x.GetApprovedWorksAsync(), Times.Once);
        }

        [Fact]
        public async Task GetApprovedWorksAsyncReturnListOfWorks()
        {
            var userId = 0u;
            var scientificWorkId = 0u;
            var fakeWorks = new Faker<ScientificWork>().Rules(
                (f, o) =>
                {
                    o.Id = scientificWorkId++;
                    o.Name = f.Commerce.ProductName();
                    o.Description = f.Commerce.ProductDescription();
                    o.MainAuthor = new User()
                    {
                        Id = userId++,
                        Name = f.Person.FirstName,
                        Surname = f.Person.LastName
                    };
                    o.Status = StatusEnum.Accepted;
                    o.CreationDate = f.Date.Recent();
                    o.Versions = Enumerable.Range(1, f.Random.Number(1, 3))
                                           .Select(x => new ScientificWorkFile()
                                           {
                                               Version = (byte)x,
                                               DateAdd = DateTime.UtcNow.AddDays(x)
                                           });
                }).Generate(3);

            var expectedList = fakeWorks.Select(x => new ScientificWorkDto()
            {
                Id = x.Id,
                Title = x.Name,
                Authors = $"{x.MainAuthor.Name} {x.MainAuthor.Surname}",
                Description = x.Description,
                CreationDate = x.CreationDate.ToString("g"),
                UpdateDate = x.Versions.Last().DateAdd.ToString("g")
            });

            IEnumerable<ScientificWorkDto> returnedScientificWorks = null;

            _scientificWorkRepositoryMock.Setup(x => x.GetApprovedWorksAsync()).ReturnsAsync(fakeWorks);

            var err = await Record.ExceptionAsync(async
                () => returnedScientificWorks = await _service.GetApprovedWorksAsync());

            err.Should().BeNull();
            returnedScientificWorks.Should().BeEquivalentTo(expectedList);

            _scientificWorkRepositoryMock.Verify(x => x.GetApprovedWorksAsync(), Times.Once);
        }

        [Fact]
        public async Task GetApprovedWorksAsyncCreateStringWithAllAuthors()
        {
            var userId = 0u;
            var scientificWorkId = 0u;
            var fakeWorks = new Faker<ScientificWork>().Rules(
                (f, o) =>
                {
                    o.Id = scientificWorkId++;
                    o.Name = f.Commerce.ProductName();
                    o.Description = f.Commerce.ProductDescription();
                    o.MainAuthor = new User()
                    {
                        Id = userId++,
                        Name = f.Person.FirstName,
                        Surname = f.Person.LastName
                    };
                    o.OtherAuthors = string.Join(", ", Enumerable.Range(1, 3).Select(_ => f.Person.FullName));
                    o.Status = StatusEnum.Accepted;
                    o.CreationDate = f.Date.Recent();
                    o.Versions = Enumerable.Range(1, f.Random.Number(1, 3))
                                           .Select(x => new ScientificWorkFile()
                                           {
                                               Version = (byte)x,
                                               DateAdd = DateTime.UtcNow.AddDays(x)
                                           });
                }).Generate(3);

            var expectedList = fakeWorks.Select(x => new ScientificWorkDto()
            {
                Id = x.Id,
                Title = x.Name,
                Authors = $"{x.MainAuthor.Name} {x.MainAuthor.Surname}, {x.OtherAuthors}",
                Description = x.Description,
                CreationDate = x.CreationDate.ToString("g"),
                UpdateDate = x.Versions.Last().DateAdd.ToString("g")
            });

            IEnumerable<ScientificWorkDto> returnedScientificWorks = null;

            _scientificWorkRepositoryMock.Setup(x => x.GetApprovedWorksAsync()).ReturnsAsync(fakeWorks);

            var err = await Record.ExceptionAsync(async
                () => returnedScientificWorks = await _service.GetApprovedWorksAsync());

            err.Should().BeNull();
            returnedScientificWorks.Should().BeEquivalentTo(expectedList);
        }

        [Fact]
        public async Task GetStreamOfScientificWorkAsyncReturnNullWhenWorkDoesNotExists()
        {
            var scientificWorkId = 1u;

            Stream returnedStream = null;

            _scientificWorkFileRepositoryMock.Setup(x => x.GetNewestVersionAsync(scientificWorkId)).ReturnsAsync((ScientificWorkFile)null);

            var err = await Record.ExceptionAsync(async
                () => returnedStream = await _service.GetStreamOfScientificWorkAsync(scientificWorkId));

            err.Should().BeNull();
            returnedStream.Should().BeNull();

            _scientificWorkFileRepositoryMock.Verify(x => x.GetNewestVersionAsync(scientificWorkId), Times.Once);
        }

        [Fact]
        public async Task GetStreamOfScientificWorkAsyncReturnStreamOfFile()
        {
            var scientificWorkId = 1u;

            var scientificFileWork = new ScientificWorkFile()
            {
                Id = 1,
                FileName = _faker.System.FileName("pdf")
            };

            Stream returnedStream = null;

            var expectedWorkStream = new MemoryStream(Encoding.UTF8.GetBytes(_faker.Random.String(7)));

            _scientificWorkFileRepositoryMock.Setup(x => x.GetNewestVersionAsync(scientificFileWork.Id)).ReturnsAsync(scientificFileWork);
            _fileManagerMock.Setup(x => x.GetStreamOfFile(scientificFileWork.FileName)).Returns(expectedWorkStream);

            var err = await Record.ExceptionAsync(async
                () => returnedStream = await _service.GetStreamOfScientificWorkAsync(scientificWorkId));

            err.Should().BeNull();
            returnedStream.Should().NotBeNull();
            returnedStream.Should().BeEquivalentTo(expectedWorkStream);

            _scientificWorkFileRepositoryMock.Verify(x => x.GetNewestVersionAsync(scientificWorkId), Times.Once);
        }

        [Fact]
        public async Task GetWorkByIdAsyncReturnNullWhenWorkDoesNotExits()
        {
            var userId = 1u;
            var scientificWorkId = 1u;

            ScientificWorkWithReviewDto returnedDto = null;

            _scientificWorkRepositoryMock.Setup(x => x.GetWorkByIdAsync(scientificWorkId)).ReturnsAsync((ScientificWork)null);

            var err = await Record.ExceptionAsync(async
                () => returnedDto = await _service.GetWorkByIdAsync(userId, scientificWorkId));

            err.Should().BeNull();
            returnedDto.Should().BeNull();

            _scientificWorkRepositoryMock.Verify(x => x.GetWorkByIdAsync(scientificWorkId), Times.Once);
        }

        [Fact]
        public async Task GetWorkByIdAsyncParticipantSeeOnlyWorkInformationOnlyWhenWorkIsAccepted()
        {
            var authorId = 1u;
            var userId = 2u;
            var scientificWorkId = 1u;

            var scientificWork = new ScientificWork()
            {
                Id = scientificWorkId,
                Name = _faker.Commerce.ProductName(),
                Description = _faker.Commerce.ProductDescription(),
                CreationDate = DateTime.UtcNow,
                OtherAuthors = string.Join(", ", Enumerable.Range(1, 3).Select(_ => _faker.Person.FullName)),
                Status = StatusEnum.Accepted,
                MainAuthor = new User()
                {
                    Id = authorId,
                    Name = _faker.Person.FirstName,
                    Surname = _faker.Person.LastName,
                    Photo = null,
                    Degree = _faker.Name.JobTitle(),
                    University = _faker.Company.CompanyName()
                },
                Versions = Enumerable.Range(0, 2)
                                     .Select(x => new ScientificWorkFile()
                                     {
                                         Id = (uint)x,
                                         Version = (byte)x,
                                         DateAdd = DateTime.UtcNow.AddDays(x)
                                     })
            };

            ScientificWorkWithReviewDto returnedDto = null;

            var expectedDto = new ScientificWorkWithReviewDto()
            {
                Status = scientificWork.Status.ToString(),
                Versions = null,
                Mode = nameof(UserTypeEnum.Participant),
                MainAuthor = _mapper.Map<UserDto>(scientificWork.MainAuthor),
                ScientificWork = new ScientificWorkDto()
                {
                    Id = scientificWork.Id,
                    Title = scientificWork.Name,
                    Description = scientificWork.Description,
                    Specialization = scientificWork.Specialization,
                    CreationDate = scientificWork.CreationDate.ToString("g"),
                    UpdateDate = scientificWork.Versions.Last().DateAdd.ToString("g"),
                    Authors = scientificWork.OtherAuthors,
                }
            };

            _scientificWorkRepositoryMock.Setup(x => x.GetWorkByIdAsync(scientificWorkId)).ReturnsAsync(scientificWork);
            _reviewerScientificWorkRepositoryMock.Setup(x => x.IsReviewerAsync(scientificWorkId, userId)).ReturnsAsync(false);

            var err = await Record.ExceptionAsync(async
                () => returnedDto = await _service.GetWorkByIdAsync(userId, scientificWorkId));

            err.Should().BeNull();

            returnedDto.Should().NotBeNull();
            returnedDto.Should().BeEquivalentTo(expectedDto);

            _scientificWorkFileRepositoryMock.Verify(x => x.GetVersionsWithReviews(It.IsAny<uint>()), Times.Never);
        }

        [Fact]
        public async Task GetWorkByIdAsyncAddPhotoOfMainAuthorWhenItsAvalaible()
        {
            var authorId = 1u;
            var userId = 2u;
            var scientificWorkId = 1u;

            var randomBase64 = Convert.ToBase64String(Encoding.UTF8.GetBytes(_faker.Random.String(7)));

            var author = new User()
            {
                Id = authorId,
                Name = _faker.Person.FirstName,
                Surname = _faker.Person.LastName,
                Photo = _faker.System.FileName("png"),
                Degree = _faker.Name.JobTitle(),
                University = _faker.Company.CompanyName()
            };

            var scientificWork = new ScientificWork()
            {
                Id = scientificWorkId,
                Name = _faker.Commerce.ProductName(),
                Description = _faker.Commerce.ProductDescription(),
                CreationDate = DateTime.UtcNow,
                Status = StatusEnum.Accepted,
                MainAuthor = author,
                Versions = Enumerable.Range(0, 2)
                                     .Select(x => new ScientificWorkFile()
                                     {
                                         Id = (uint)x,
                                         Version = (byte)x,
                                         DateAdd = DateTime.UtcNow.AddDays(x)
                                     })
            };

            _scientificWorkRepositoryMock.Setup(x => x.GetWorkByIdAsync(scientificWorkId)).ReturnsAsync(scientificWork);
            _reviewerScientificWorkRepositoryMock.Setup(x => x.IsReviewerAsync(scientificWorkId, userId)).ReturnsAsync(false);

            _fileManagerMock.Setup(x => x.GetBase64FileAsync(author.Photo)).ReturnsAsync(randomBase64);

            var err = await Record.ExceptionAsync(async
                () => await _service.GetWorkByIdAsync(userId, scientificWorkId));

            err.Should().BeNull();

            _fileManagerMock.Verify(x => x.GetBase64FileAsync(author.Photo), Times.Once);
        }

        [Fact]
        public async Task GetWorkByIdAsyncReviewerSeeOnlyOwnReviews()
        {
            var authorId = 1u;
            var userId = 2u;
            var reviewer2Id = 3u;

            var scientificWorkId = 1u;
            var versionsId = 0u;
            var reviewId = 1u;
            var answerId = 1u;

            var author = new User()
            {
                Id = authorId,
                Name = _faker.Person.FirstName,
                Surname = _faker.Person.LastName,
                Photo = null,
                Degree = _faker.Name.JobTitle(),
                University = _faker.Company.CompanyName()
            };

            var reviewer1 = new User() { Id = userId };
            var reviewer2 = new User() { Id = reviewer2Id };

            var scientificWork = new ScientificWork()
            {
                Id = scientificWorkId,
                Name = _faker.Commerce.ProductName(),
                Description = _faker.Commerce.ProductDescription(),
                CreationDate = DateTime.UtcNow,
                OtherAuthors = string.Join(", ", Enumerable.Range(1, 3).Select(_ => _faker.Person.FullName)),
                Status = StatusEnum.Accepted,
                MainAuthor = author,
                Versions = new List<ScientificWorkFile>()
                {
                    new ScientificWorkFile(){
                        Id = ++versionsId,
                        Version = (byte)versionsId,
                        DateAdd = DateTime.UtcNow.AddDays(versionsId),
                        Reviews = new List<Review>()
                        {
                            new Review()
                            {
                                Id = reviewId++,
                                DateReview = DateTime.UtcNow,
                                Comment = _faker.Rant.Review(),
                                Rating = _faker.Random.Byte(1, 3),
                                Reviewer = reviewer1
                            },
                            new Review()
                            {
                                Id = reviewId++,
                                DateReview = DateTime.UtcNow,
                                File = _faker.System.FileName("pdf"),
                                Rating = _faker.Random.Byte(1, 3),
                                Reviewer = reviewer2,
                                Answer = new Answer()
                                {
                                    Id = answerId++,
                                    Comment = _faker.Lorem.Sentence(5),
                                    AnswerDate = DateTime.UtcNow,
                                    User = author
                                }
                            }
                        }
                    },
                    new ScientificWorkFile(){
                        Id = ++versionsId,
                        Version = (byte)versionsId,
                        DateAdd = DateTime.UtcNow.AddDays(versionsId),
                        Reviews = new List<Review>()
                        {
                            new Review()
                            {
                                Id = reviewId++,
                                DateReview = DateTime.UtcNow,
                                File = _faker.System.FileName("pdf"),
                                Rating = _faker.Random.Byte(1, 3),
                                Reviewer = reviewer1,
                                Answer = new Answer()
                                {
                                    Id = answerId++,
                                    Comment = _faker.Lorem.Sentence(5),
                                    AnswerDate = DateTime.UtcNow,
                                    User = author
                                }
                            },
                            new Review()
                            {
                                Id = reviewId++,
                                DateReview = DateTime.UtcNow,
                                Comment = _faker.Rant.Review(),
                                Rating = _faker.Random.Byte(1, 3),
                                Reviewer = reviewer2
                            }
                        }
                    },
                }
            };

            ScientificWorkWithReviewDto returnedDto = null;

            var expectedDto = new ScientificWorkWithReviewDto()
            {
                Mode = nameof(UserTypeEnum.Reviewer),
                Status = scientificWork.Status.ToString(),
                MainAuthor = _mapper.Map<UserDto>(author),
                ScientificWork = new ScientificWorkDto()
                {
                    Id = scientificWork.Id,
                    Title = scientificWork.Name,
                    Description = scientificWork.Description,
                    Specialization = scientificWork.Specialization,
                    CreationDate = scientificWork.CreationDate.ToString("g"),
                    UpdateDate = scientificWork.Versions.Last().DateAdd.ToString("g"),
                    Authors = scientificWork.OtherAuthors,
                },
                Versions = new List<VersionDto>()
                {
                    new VersionDto()
                    {
                        Date = scientificWork.Versions.ElementAt(0).DateAdd.ToString("g"),
                        VersionNumber = scientificWork.Versions.ElementAt(0).Version,
                        Reviews = new List<ReviewDto>()
                        {
                            new ReviewDto()
                            {
                                Id = scientificWork.Versions.ElementAt(0).Reviews.ElementAt(0).Id,
                                Rating = scientificWork.Versions.ElementAt(0).Reviews.ElementAt(0).Rating,
                                IsReviewFileExist = false,
                                ReviewDate = scientificWork.Versions.ElementAt(0).Reviews.ElementAt(0).DateReview.ToString("g"),
                                ReviewMsg = scientificWork.Versions.ElementAt(0).Reviews.ElementAt(0).Comment,
                                AnswerDate = null,
                                AnswerMsg = null
                            }
                        }
                    },
                    new VersionDto()
                    {
                        Date = scientificWork.Versions.ElementAt(1).DateAdd.ToString("g"),
                        VersionNumber = scientificWork.Versions.ElementAt(1).Version,
                        Reviews = new List<ReviewDto>()
                        {
                            new ReviewDto()
                            {
                                Id = scientificWork.Versions.ElementAt(1).Reviews.ElementAt(0).Id,
                                Rating = scientificWork.Versions.ElementAt(1).Reviews.ElementAt(0).Rating,
                                IsReviewFileExist = true,
                                ReviewDate = scientificWork.Versions.ElementAt(1).Reviews.ElementAt(0).DateReview.ToString("g"),
                                ReviewMsg = scientificWork.Versions.ElementAt(1).Reviews.ElementAt(0).Comment,
                                AnswerDate = scientificWork.Versions.ElementAt(1).Reviews.ElementAt(0).Answer.AnswerDate.ToString("g"),
                                AnswerMsg = scientificWork.Versions.ElementAt(1).Reviews.ElementAt(0).Answer.Comment
                            }
                        }
                    }
                },
            };

            _scientificWorkRepositoryMock.Setup(x => x.GetWorkByIdAsync(scientificWorkId)).ReturnsAsync(scientificWork);
            _scientificWorkFileRepositoryMock.Setup(x => x.GetVersionsWithReviews(scientificWorkId)).ReturnsAsync(scientificWork.Versions);
            _reviewerScientificWorkRepositoryMock.Setup(x => x.IsReviewerAsync(scientificWorkId, userId)).ReturnsAsync(true);

            var err = await Record.ExceptionAsync(async
                () => returnedDto = await _service.GetWorkByIdAsync(userId, scientificWorkId));

            err.Should().BeNull();

            returnedDto.Should().NotBeNull();
            returnedDto.Should().BeEquivalentTo(expectedDto);

            _scientificWorkFileRepositoryMock.Verify(x => x.GetVersionsWithReviews(scientificWorkId), Times.Once);
        }

        [Fact]
        public async Task GetWorkByIdAsyncAuthorSeeEverything()
        {
            var userId = 1u;
            var reviewer1Id = 2u;
            var reviewer2Id = 3u;

            var scientificWorkId = 1u;
            var versionsId = 0u;
            var reviewId = 1u;
            var answerId = 1u;

            var author = new User()
            {
                Id = userId,
                Name = _faker.Person.FirstName,
                Surname = _faker.Person.LastName,
                Photo = null,
                Degree = _faker.Name.JobTitle(),
                University = _faker.Company.CompanyName()
            };

            var reviewer1 = new User() { Id = reviewer1Id };
            var reviewer2 = new User() { Id = reviewer2Id };

            var scientificWork = new ScientificWork()
            {
                Id = scientificWorkId,
                Name = _faker.Commerce.ProductName(),
                Description = _faker.Commerce.ProductDescription(),
                CreationDate = DateTime.UtcNow,
                OtherAuthors = string.Join(", ", Enumerable.Range(1, 3).Select(_ => _faker.Person.FullName)),
                Status = StatusEnum.Accepted,
                MainAuthor = author,
                Versions = new List<ScientificWorkFile>()
                {
                    new ScientificWorkFile(){
                        Id = ++versionsId,
                        Version = (byte)versionsId,
                        DateAdd = DateTime.UtcNow.AddDays(versionsId),
                        Reviews = new List<Review>()
                        {
                            new Review()
                            {
                                Id = reviewId++,
                                DateReview = DateTime.UtcNow,
                                Comment = _faker.Rant.Review(),
                                Rating = _faker.Random.Byte(1, 3),
                                Reviewer = reviewer1
                            },
                            new Review()
                            {
                                Id = reviewId++,
                                DateReview = DateTime.UtcNow,
                                File = _faker.System.FileName("pdf"),
                                Rating = _faker.Random.Byte(1, 3),
                                Reviewer = reviewer2,
                                Answer = new Answer()
                                {
                                    Id = answerId++,
                                    Comment = _faker.Lorem.Sentence(5),
                                    AnswerDate = DateTime.UtcNow,
                                    User = author
                                }
                            }
                        }
                    },
                    new ScientificWorkFile(){
                        Id = ++versionsId,
                        Version = (byte)versionsId,
                        DateAdd = DateTime.UtcNow.AddDays(versionsId),
                        Reviews = new List<Review>()
                        {
                            new Review()
                            {
                                Id = reviewId++,
                                DateReview = DateTime.UtcNow,
                                File = _faker.Rant.Review(),
                                Rating = _faker.Random.Byte(1, 3),
                                Reviewer = reviewer1,
                                Answer = new Answer()
                                {
                                    Id = answerId++,
                                    Comment = _faker.Lorem.Sentence(5),
                                    AnswerDate = DateTime.UtcNow,
                                    User = author
                                }
                            },
                            new Review()
                            {
                                Id = reviewId++,
                                DateReview = DateTime.UtcNow,
                                Comment = _faker.System.FileName("pdf"),
                                Rating = _faker.Random.Byte(1, 3),
                                Reviewer = reviewer2
                            }
                        }
                    },
                }
            };

            ScientificWorkWithReviewDto returnedDto = null;

            var expectedDto = new ScientificWorkWithReviewDto()
            {
                Status = scientificWork.Status.ToString(),
                Mode = "Author",
                MainAuthor = _mapper.Map<UserDto>(author),
                ScientificWork = new ScientificWorkDto()
                {
                    Id = scientificWork.Id,
                    Title = scientificWork.Name,
                    Description = scientificWork.Description,
                    Specialization = scientificWork.Specialization,
                    CreationDate = scientificWork.CreationDate.ToString("g"),
                    UpdateDate = scientificWork.Versions.ElementAt(1).DateAdd.ToString("g"),
                    Authors = scientificWork.OtherAuthors,
                },
                Versions = new List<VersionDto>()
                {
                    new VersionDto()
                    {
                        Date = scientificWork.Versions.ElementAt(0).DateAdd.ToString("g"),
                        VersionNumber = scientificWork.Versions.ElementAt(0).Version,
                        Reviews = new List<ReviewDto>()
                        {
                            new ReviewDto()
                            {
                                Id = scientificWork.Versions.ElementAt(0).Reviews.ElementAt(0).Id,
                                Rating = scientificWork.Versions.ElementAt(0).Reviews.ElementAt(0).Rating,
                                IsReviewFileExist = false,
                                ReviewDate = scientificWork.Versions.ElementAt(0).Reviews.ElementAt(0).DateReview.ToString("g"),
                                ReviewMsg = scientificWork.Versions.ElementAt(0).Reviews.ElementAt(0).Comment,
                                AnswerDate = null,
                                AnswerMsg = null
                            },
                            new ReviewDto()
                            {
                                Id = scientificWork.Versions.ElementAt(0).Reviews.ElementAt(1).Id,
                                Rating = scientificWork.Versions.ElementAt(0).Reviews.ElementAt(1).Rating,
                                IsReviewFileExist = true,
                                ReviewDate = scientificWork.Versions.ElementAt(0).Reviews.ElementAt(1).DateReview.ToString("g"),
                                AnswerDate = scientificWork.Versions.ElementAt(0).Reviews.ElementAt(1).Answer.AnswerDate.ToString("g"),
                                AnswerMsg = scientificWork.Versions.ElementAt(0).Reviews.ElementAt(1).Answer.Comment
                            }
                        }
                    },
                    new VersionDto()
                    {
                        Date = scientificWork.Versions.ElementAt(1).DateAdd.ToString("g"),
                        VersionNumber = scientificWork.Versions.ElementAt(1).Version,
                        Reviews = new List<ReviewDto>()
                        {
                            new ReviewDto()
                            {
                                Id = scientificWork.Versions.ElementAt(1).Reviews.ElementAt(0).Id,
                                Rating = scientificWork.Versions.ElementAt(1).Reviews.ElementAt(0).Rating,
                                IsReviewFileExist = true,
                                ReviewDate = scientificWork.Versions.ElementAt(1).Reviews.ElementAt(0).DateReview.ToString("g"),
                                ReviewMsg = scientificWork.Versions.ElementAt(1).Reviews.ElementAt(0).Comment,
                                AnswerDate = scientificWork.Versions.ElementAt(1).Reviews.ElementAt(0).Answer.AnswerDate.ToString("g"),
                                AnswerMsg = scientificWork.Versions.ElementAt(1).Reviews.ElementAt(0).Answer.Comment
                            },
                            new ReviewDto()
                            {
                                Id = scientificWork.Versions.ElementAt(1).Reviews.ElementAt(1).Id,
                                Rating = scientificWork.Versions.ElementAt(1).Reviews.ElementAt(1).Rating,
                                IsReviewFileExist = false,
                                ReviewDate = scientificWork.Versions.ElementAt(1).Reviews.ElementAt(1).DateReview.ToString("g"),
                                ReviewMsg = scientificWork.Versions.ElementAt(1).Reviews.ElementAt(1).Comment,
                                AnswerDate = null,
                                AnswerMsg = null
                            }
                        }
                    }
                }
            };

            _scientificWorkRepositoryMock.Setup(x => x.GetWorkByIdAsync(scientificWorkId)).ReturnsAsync(scientificWork);
            _scientificWorkFileRepositoryMock.Setup(x => x.GetVersionsWithReviews(scientificWorkId)).ReturnsAsync(scientificWork.Versions);

            var err = await Record.ExceptionAsync(async
                () => returnedDto = await _service.GetWorkByIdAsync(userId, scientificWorkId));

            err.Should().BeNull();

            returnedDto.Should().NotBeNull();
            returnedDto.Should().BeEquivalentTo(expectedDto);

            _scientificWorkFileRepositoryMock.Verify(x => x.GetVersionsWithReviews(scientificWorkId), Times.Once);
        }

        [Fact]
        public async Task GetWorkByIdAsyncThrowAuthenticationExceptionWhenUserIsParticipantAndWorkIsNotAccepted()
        {
            var authorId = 1u;
            var userId = 2u;
            var scientificWorkId = 1u;

            var author = new User()
            {
                Id = authorId,
                Name = _faker.Person.FirstName,
                Surname = _faker.Person.LastName,
                Photo = null,
                Degree = _faker.Name.JobTitle(),
                University = _faker.Company.CompanyName()
            };

            var scientificWork = new ScientificWork()
            {
                Id = scientificWorkId,
                Name = _faker.Commerce.ProductName(),
                Description = _faker.Commerce.ProductDescription(),
                CreationDate = DateTime.UtcNow,
                OtherAuthors = string.Join(", ", Enumerable.Range(1, 3).Select(_ => _faker.Person.FullName)),
                Status = StatusEnum.UnderReview,
                MainAuthor = author,
            };

            ScientificWorkWithReviewDto returnedDto = null;

            _scientificWorkRepositoryMock.Setup(x => x.GetWorkByIdAsync(scientificWorkId)).ReturnsAsync(scientificWork);
            _reviewerScientificWorkRepositoryMock.Setup(x => x.IsReviewerAsync(scientificWorkId, userId)).ReturnsAsync(false);

            var err = await Record.ExceptionAsync(async
                () => returnedDto = await _service.GetWorkByIdAsync(userId, scientificWorkId));

            err.Should().BeOfType<AuthenticationException>();
            returnedDto.Should().BeNull();
        }

        [Fact]
        public async Task GetListOfWorksForReviewerThrowAuthenticationExceptionWhenUserIsNotReviewer()
        {
            var user = new User()
            {
                Id = 1,
                NormalizedUserName = NormilizeUsername(nameof(UserTypeEnum.Participant))
            };

            _userStoreMock.Setup(x => x.FindByIdAsync(user.Id.ToString(), CancellationToken.None)).ReturnsAsync(user);

            var err = await Record.ExceptionAsync(async
                () => await _service.GetListOfWorksForReviewer(user.Id));

            err.Should().BeOfType<AuthenticationException>();

            _reviewerScientificWorkRepositoryMock.Verify(x => x.GetListOfWorksForReviewerAsync(It.IsAny<uint>()), Times.Never);
        }

        [Fact]
        public async Task GetListOfWorksForReviewerReturnList()
        {
            var workId = 1u;
            var userId = 1u;
            var authorId = 2u;

            var user = new User()
            {
                Id = userId,
                NormalizedUserName = NormilizeUsername(nameof(UserTypeEnum.Reviewer))
            };

            var fakeWorks = new Faker<ScientificWork>().Rules((f, o) =>
            {
                o.Id = workId++;
                o.Name = f.Commerce.ProductName();
                o.Description = f.Commerce.ProductDescription();
                o.OtherAuthors = string.Join(", ", Enumerable.Range(1, 3).Select(_ => f.Person.FullName));
                o.Status = f.PickRandomWithout(StatusEnum.WaitingForDrawOfReviewers);
                o.CreationDate = DateTime.UtcNow;
                o.MainAuthor = new User()
                {
                    Id = authorId,
                    Name = f.Person.FirstName,
                    Surname = f.Person.LastName
                };
                o.Versions = Enumerable.Range(1, f.Random.Number(1, 3))
                                       .Select(x => new ScientificWorkFile()
                                       {
                                           Version = (byte)x,
                                           DateAdd = DateTime.UtcNow.AddDays(x)
                                       });
            }).Generate(3);

            var expectedList = fakeWorks.Select(x => new ScientificWorkWithStatusDto()
            {
                Id = x.Id,
                Title = x.Name,
                Authors = $"{x.MainAuthor.Name} {x.MainAuthor.Surname}, {x.OtherAuthors}",
                Description = x.Description,
                CreationDate = x.CreationDate.ToString("g"),
                UpdateDate = x.Versions.Last().DateAdd.ToString("g"),
                Status = x.Status.ToString()
            });

            IEnumerable<ScientificWorkWithStatusDto> returnedDto = null;

            _userStoreMock.Setup(x => x.FindByIdAsync(userId.ToString(), CancellationToken.None)).ReturnsAsync(user);
            _reviewerScientificWorkRepositoryMock.Setup(x => x.GetListOfWorksForReviewerAsync(userId)).ReturnsAsync(fakeWorks);

            var err = await Record.ExceptionAsync(async
                () => returnedDto = await _service.GetListOfWorksForReviewer(userId));

            err.Should().BeNull();

            returnedDto.Should().NotBeNull();
            returnedDto.Should().BeEquivalentTo(expectedList);

            _reviewerScientificWorkRepositoryMock.Verify(x => x.GetListOfWorksForReviewerAsync(userId), Times.Once);
        }

        private string NormilizeUsername(string userType)
            => $"{userType}:{_faker.Internet.Email()}".ToUpper();
    }
}

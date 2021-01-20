using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using FluentAssertions;
using Kongres.Api.Application.Services;
using Kongres.Api.Domain.DTOs;
using Kongres.Api.Domain.Entities;
using Kongres.Api.Domain.Enums;
using Kongres.Api.Infrastructure;
using Kongres.Api.Infrastructure.Repositories.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Moq;
using Xunit;

namespace Kongres.Api.Tests.Unit.Services
{
    public class ScientificWorkTestService
    {
        private readonly Mock<IScientificWorkRepository> _scientificWorkRepositoryMock;
        private readonly Mock<IScientificWorkFileRepository> _scientificWorkFileRepositoryMock;
        private readonly Mock<IReviewRepository> _reviewRepositoryMock;
        private readonly Mock<IFileManager> _fileManagerMock;
        private readonly Mock<IUserStore<User>> _userStoreMock;
        private readonly UserManager<User> _userManager;
        private readonly ScientificWorkService _service;

        public ScientificWorkTestService()
        {
            _scientificWorkFileRepositoryMock = new Mock<IScientificWorkFileRepository>();
            _scientificWorkRepositoryMock = new Mock<IScientificWorkRepository>();
            _reviewRepositoryMock = new Mock<IReviewRepository>();
            _fileManagerMock = new Mock<IFileManager>();
            _userStoreMock = new Mock<IUserStore<User>>();

            _userManager = new UserManager<User>(_userStoreMock.Object, null, null, null, null, null, null, null, null);

            _service = new ScientificWorkService(_scientificWorkRepositoryMock.Object,
                                                _scientificWorkFileRepositoryMock.Object,
                                                _reviewRepositoryMock.Object,
                                                _userManager,
                                                _fileManagerMock.Object);
        }

        [Fact]
        public async Task AddBasicInfoAsyncAddWithoutChanges()
        {
            var user = new User()
            {
                Id = 1,
                Name = "John",
                Surname = "Smith"
            };

            const string title = "TheTitle";
            const string description = "Description";
            const string authors = "ListOfAuthors";
            const string specialization = "Mathematics";

            _userStoreMock.Reset();
            _userStoreMock.Setup(x => x.FindByIdAsync(user.Id.ToString(), CancellationToken.None)).ReturnsAsync(user);

            _scientificWorkRepositoryMock.Reset();
            _scientificWorkRepositoryMock.Setup(x => x.AddAsync(It.Is<ScientificWork>(y => y.MainAuthor == user && y.Status == StatusEnum.WaitingForReview)));

            var err = await Record.ExceptionAsync(async () => await _service.AddBasicInfoAsync(user.Id.ToString(), title, description, authors, specialization));

            err.Should().BeNull();

            _userStoreMock.Verify(x => x.FindByIdAsync(user.Id.ToString(), CancellationToken.None), Times.Once);
            _scientificWorkRepositoryMock.Verify(x => x.AddAsync(It.Is<ScientificWork>(y => y.MainAuthor == user && y.Status == StatusEnum.WaitingForReview)), Times.Once);
        }

        [Fact]
        public async Task AddVersionAsyncAddFirstSuccess()
        {
            uint userId = 1;
            var file = new FormFile(null, 23545, 342465, "HeHeNameHeHe", "FileNameHeHe");

            var randomNameOfFile = "askdfbalrtbl.png";

            var scientificWork = new ScientificWork()
            {
                Id = 1,
                Name = "title of work",
                Description = "Lorem ipsum",
            };

            var newVersion = new ScientificWorkFile()
            {
                Version = 1,
                FileName = randomNameOfFile,
                ScientificWork = scientificWork
            };

            _scientificWorkRepositoryMock.Reset();
            _scientificWorkRepositoryMock.Setup(x => x.GetNumberOfVersionsByAuthorIdAsync(It.IsAny<uint>())).ReturnsAsync((byte)0);
            _scientificWorkRepositoryMock.Setup(x => x.GetByAuthorIdAsync(userId)).ReturnsAsync(scientificWork);

            _fileManagerMock.Reset();
            _fileManagerMock.Setup(x => x.SaveFileAsync(file)).ReturnsAsync(randomNameOfFile);

            _scientificWorkFileRepositoryMock.Reset();
            _scientificWorkFileRepositoryMock.Setup(x => x.AddAsync(It.Is<ScientificWorkFile>(y => y.Version == newVersion.Version && y.FileName == newVersion.FileName && y.ScientificWork == newVersion.ScientificWork)));

            var err = await Record.ExceptionAsync(async
                () => await _service.AddVersionAsync(userId, file, true));

            err.Should().BeNull();

            _scientificWorkRepositoryMock.Verify(x => x.GetNumberOfVersionsByAuthorIdAsync(It.IsAny<uint>()), Times.Never);
            _scientificWorkRepositoryMock.Verify(x => x.GetByAuthorIdAsync(userId), Times.Once);
        }

        [Fact]
        public async Task AddVersionAsyncAddNextVersionsSuccess()
        {
            uint userId = 1;
            var file = new FormFile(null, 23545, 342465, "HeHeNameHeHe", "FileNameHeHe");

            var randomNameOfFile = "askdfbalrtbl.png";

            byte versionNumber = 1;

            var scientificWork = new ScientificWork()
            {
                Id = 1,
                Name = "title of work",
                Description = "Lorem ipsum",
            };

            var newVersion = new ScientificWorkFile()
            {
                Version = (byte)(versionNumber + 1),
                FileName = randomNameOfFile,
                ScientificWork = scientificWork
            };

            _scientificWorkRepositoryMock.Reset();
            _scientificWorkRepositoryMock.Setup(x => x.GetNumberOfVersionsByAuthorIdAsync(It.IsAny<uint>())).ReturnsAsync(versionNumber);
            _scientificWorkRepositoryMock.Setup(x => x.GetByAuthorIdAsync(userId)).ReturnsAsync(scientificWork);

            _fileManagerMock.Reset();
            _fileManagerMock.Setup(x => x.SaveFileAsync(file)).ReturnsAsync(randomNameOfFile);

            _scientificWorkFileRepositoryMock.Reset();
            _scientificWorkFileRepositoryMock.Setup(x => x.AddAsync(It.Is<ScientificWorkFile>(y => y.Version == newVersion.Version && y.FileName == newVersion.FileName && y.ScientificWork == newVersion.ScientificWork)));

            var err = await Record.ExceptionAsync(async
                            () => await _service.AddVersionAsync(userId, file));

            err.Should().BeNull();

            _scientificWorkRepositoryMock.Verify(x => x.GetNumberOfVersionsByAuthorIdAsync(It.IsAny<uint>()), Times.Once);
            _scientificWorkRepositoryMock.Verify(x => x.GetByAuthorIdAsync(userId), Times.Once);
        }

        [Fact]
        public async Task GetApprovedWorksAsyncReturnNullWhenDbDoesNotContainApprovedWorks()
        {
            var expectedList = Enumerable.Empty<ScientificWorkDto>();
            IEnumerable<ScientificWorkDto> approvedWorks = null;

            _scientificWorkRepositoryMock.Reset();
            _scientificWorkRepositoryMock.Setup(x => x.GetApprovedWorksAsync()).ReturnsAsync(Enumerable.Empty<ScientificWork>());

            var err = await Record.ExceptionAsync(async
                () => approvedWorks = await _service.GetApprovedWorksAsync());

            err.Should().BeNull();

            approvedWorks.Should().BeEquivalentTo(expectedList);
        }

        [Fact]
        public async Task GetApprovedWorksAsyncReturnListOfWorks()
        {
            var fakeWorks = new List<ScientificWork>()
            {
                new ScientificWork()
                {
                    Id = 1,
                    Name = "Nice title of work",
                    Description = "Amazing description of work",
                    MainAuthor = new User()
                    {
                        Id = 1,
                        Name = "John",
                        Surname = "Smith"
                    },
                    OtherAuthors = null,
                    Status = StatusEnum.Accepted,
                    CreationDate = DateTime.UtcNow,
                    Versions = new List<ScientificWorkFile>()
                    {
                        new ScientificWorkFile()
                        {
                            Version = 1,
                            DateAdd = DateTime.UtcNow
                        },
                        new ScientificWorkFile()
                        {
                            Version = 2,
                            DateAdd = DateTime.UtcNow.AddDays(2)
                        }
                    }
                },
                new ScientificWork()
                {
                    Id = 5,
                    Name = "Bad title of work",
                    Description = "The worst description of work in the entire world",
                    MainAuthor = new User()
                    {
                        Id = 3,
                        Name = "Nikola",
                        Surname = "Tesla"
                    },
                    OtherAuthors = "Thomas Unknown, Elisabeth Harmon",
                    Status = StatusEnum.Accepted,
                    Versions = new List<ScientificWorkFile>()
                    {
                        new ScientificWorkFile()
                        {
                            Version = 1,
                            DateAdd = DateTime.UtcNow
                        },
                    }
                }
            };

            var expectedList = new List<ScientificWorkDto>()
            {
                new ScientificWorkDto()
                {
                    Id = 1,
                    Authors = "John Smith",
                    Title = fakeWorks[0].Name,
                    Description = fakeWorks[0].Description,
                    CreationDate = fakeWorks[0].CreationDate.ToString("g"),
                    UpdateDate = fakeWorks[0].Versions.ElementAt(1).DateAdd.ToString("g")
                },
                new ScientificWorkDto()
                {
                    Id = 5,
                    Authors = "Nikola Tesla, Thomas Unknown, Elisabeth Harmon",
                    Title = fakeWorks[1].Name,
                    Description = fakeWorks[1].Description,
                    CreationDate = fakeWorks[1].CreationDate.ToString("g"),
                    UpdateDate = fakeWorks[1].Versions.ElementAt(0).DateAdd.ToString("g")
                }
            };

            IEnumerable<ScientificWorkDto> approvedWorks = null;

            _scientificWorkRepositoryMock.Reset();
            _scientificWorkRepositoryMock.Setup(x => x.GetApprovedWorksAsync()).ReturnsAsync(fakeWorks);

            var err = await Record.ExceptionAsync(async
                () => approvedWorks = await _service.GetApprovedWorksAsync());

            err.Should().BeNull();

            approvedWorks.Should().BeEquivalentTo(expectedList);
        }

        [Fact]
        public async Task GetStreamOfScientificWorkAsyncReturnNullWhenWorkDoesNotExists()
        {
            var scientificWorkId = 1u;

            Stream workStream = null;

            _scientificWorkFileRepositoryMock.Reset();
            _scientificWorkFileRepositoryMock.Setup(x => x.GetNewestVersionAsync(scientificWorkId)).ReturnsAsync((ScientificWorkFile)null);

            _fileManagerMock.Reset();

            var err = await Record.ExceptionAsync(async
                () => workStream = await _service.GetStreamOfScientificWorkAsync(scientificWorkId));

            err.Should().BeNull();
            workStream.Should().BeNull();

            _scientificWorkFileRepositoryMock.Verify(x => x.GetNewestVersionAsync(scientificWorkId), Times.Once);
            _fileManagerMock.Verify(x => x.GetStreamOfFile(It.IsAny<string>()), Times.Never);
        }

        [Fact]
        public async Task GetStreamOfScientificWorkAsyncReturnStreamOfFile()
        {
            var scientificWorkId = 1u;

            var scientificFileWork = new ScientificWorkFile()
            {
                Id = 1,
                FileName = "WonderfulNameOfFile.png"
            };

            Stream workStream = null;

            var expectedWorkStream = new MemoryStream(Encoding.UTF8.GetBytes("whatever"));

            _scientificWorkFileRepositoryMock.Reset();
            _scientificWorkFileRepositoryMock.Setup(x => x.GetNewestVersionAsync(scientificFileWork.Id)).ReturnsAsync(scientificFileWork);

            _fileManagerMock.Reset();
            _fileManagerMock.Setup(x => x.GetStreamOfFile(scientificFileWork.FileName)).Returns(expectedWorkStream);

            var err = await Record.ExceptionAsync(async
                () => workStream = await _service.GetStreamOfScientificWorkAsync(scientificWorkId));

            err.Should().BeNull();
            workStream.Should().NotBeNull();
            workStream.Should().BeEquivalentTo(expectedWorkStream);

            _scientificWorkFileRepositoryMock.Verify(x => x.GetNewestVersionAsync(scientificFileWork.Id), Times.Once);
            _fileManagerMock.Verify(x => x.GetStreamOfFile(scientificFileWork.FileName), Times.Once);
        }

        [Fact]
        public async Task GetWorkByIdAsyncReturnNullWhenWorkDoesNotExits()
        {
            var userId = 1u;
            var scientificWorkId = 1u;

            ScientificWorkWithReviewDto dto = null;

            _reviewRepositoryMock.Reset();
            _fileManagerMock.Reset();
            _scientificWorkFileRepositoryMock.Reset();
            _scientificWorkRepositoryMock.Reset();
            _scientificWorkRepositoryMock.Setup(x => x.GetWorkByIdAsync(scientificWorkId)).ReturnsAsync((ScientificWork)null);

            var err = await Record.ExceptionAsync(async
                () => dto = await _service.GetWorkByIdAsync(userId, scientificWorkId));

            err.Should().BeNull();
            dto.Should().BeNull();

            _scientificWorkRepositoryMock.Verify(x => x.GetWorkByIdAsync(scientificWorkId), Times.Once);
            _reviewRepositoryMock.Verify(x => x.IsReviewerAsync(It.IsAny<uint>(), It.IsAny<uint>()), Times.Never);
            _fileManagerMock.Verify(x => x.GetBase64FileAsync(It.IsAny<string>()), Times.Never);
            _scientificWorkFileRepositoryMock.Verify(x => x.GetVersionsWithReviews(It.IsAny<uint>()), Times.Never);
        }

        [Fact]
        public async Task GetWorkByIdAsyncParticipantSeeOnlyWorkInformation()
        {
            var userId = 1u;
            var scientificWorkId = 1u;

            var randomBase64 = "fasnljkbt432b634jhvk123j42=";

            var author = new User()
            {
                Id = 2,
                Photo = "asdf.png",
                Name = "John",
                Surname = "Smith",
                Degree = "Master of Science",
                University = "Polsl"
            };
            var reviewer1 = new User()
            {
                Id = 1,
            };
            var reviewer2 = new User()
            {
                Id = 3,
            };

            var scientificWork = new ScientificWork()
            {
                Id = scientificWorkId,
                Name = "Nice Work Title",
                Description = "Amazing work description",
                CreationDate = DateTime.UtcNow,
                OtherAuthors = "Thomas Unknown, Elisabeth Harmon",
                Status = StatusEnum.Accepted,
                MainAuthor = author,
                Versions = new List<ScientificWorkFile>()
                {
                    new ScientificWorkFile()
                    {
                        Id = 1,
                        Version = 1,
                        DateAdd = DateTime.UtcNow,
                        Reviews = new List<Review>()
                        {
                            new Review()
                            {
                                Id = 1,
                                DateReview = DateTime.UtcNow,
                                Comment = "Good job",
                                Rating = 2,
                                Reviewer = reviewer1
                            },
                            new Review()
                            {
                                Id = 2,
                                DateReview = DateTime.UtcNow,
                                File = "asdf.png",
                                Rating = 1,
                                Reviewer = reviewer2,
                                Answer = new Answer()
                                {
                                    Id = 1,
                                    Comment = "Ok",
                                    AnswerDate = DateTime.UtcNow,
                                    User = author
                                }
                            }
                        }
                    },
                    new ScientificWorkFile()
                    {
                        Id = 2,
                        Version = 2,
                        DateAdd = DateTime.UtcNow.AddDays(1),
                        Reviews = new List<Review>()
                        {
                            new Review()
                            {
                                Id = 3,
                                DateReview = DateTime.UtcNow,
                                File = "asgdbh.png",
                                Rating = 3,
                                Reviewer = reviewer1,
                                Answer = new Answer()
                                {
                                    Id = 1,
                                    Comment = "Thx",
                                    AnswerDate = DateTime.UtcNow,
                                    User = author
                                }
                            },
                            new Review()
                            {
                                Id = 4,
                                DateReview = DateTime.UtcNow,
                                Comment = "asfdknj",
                                Rating = 3,
                                Reviewer = reviewer2,
                            }
                        }
                    }
                }
            };

            ScientificWorkWithReviewDto scientificWorkWithReviewDto = null;

            var expectedDto = new ScientificWorkWithReviewDto()
            {
                Status = scientificWork.Status.ToString(),
                Versions = null,
                Mode = "Participant",
                MainAuthor = new UserDto()
                {
                    Degree = author.Degree,
                    Name = "John Smith",
                    Photo = $"data:image/png;base64,{randomBase64}",
                    University = author.University
                },
                ScientificWork = new ScientificWorkDto()
                {
                    Id = scientificWork.Id,
                    Title = scientificWork.Name,
                    Description = scientificWork.Description,
                    Specialization = scientificWork.Specialization,
                    CreationDate = scientificWork.CreationDate.ToString("g"),
                    UpdateDate = scientificWork.Versions.ElementAt(1).DateAdd.ToString("g"),
                    Authors = scientificWork.OtherAuthors,
                }
            };

            _scientificWorkRepositoryMock.Reset();
            _scientificWorkRepositoryMock.Setup(x => x.GetWorkByIdAsync(scientificWorkId)).ReturnsAsync(scientificWork);

            _scientificWorkFileRepositoryMock.Reset();

            _reviewRepositoryMock.Reset();
            _reviewRepositoryMock.Setup(x => x.IsReviewerAsync(scientificWorkId, userId)).ReturnsAsync(false);

            _fileManagerMock.Reset();
            _fileManagerMock.Setup(x => x.GetBase64FileAsync(author.Photo)).ReturnsAsync(randomBase64);

            var err = await Record.ExceptionAsync(async
                () => scientificWorkWithReviewDto = await _service.GetWorkByIdAsync(userId, scientificWorkId));

            err.Should().BeNull();

            scientificWorkWithReviewDto.Should().NotBeNull();
            scientificWorkWithReviewDto.Should().BeEquivalentTo(expectedDto);

            _scientificWorkRepositoryMock.Verify(x => x.GetWorkByIdAsync(scientificWorkId), Times.Once);
            _reviewRepositoryMock.Verify(x => x.IsReviewerAsync(scientificWorkId, userId), Times.Once);
            _fileManagerMock.Verify(x => x.GetBase64FileAsync(author.Photo), Times.Once);
            _scientificWorkFileRepositoryMock.Verify(x => x.GetVersionsWithReviews(It.IsAny<uint>()), Times.Never);
        }

        [Fact]
        public async Task GetWorkByIdAsyncReviewerSeeOnlyOwnReviews()
        {
            var userId = 1u;
            var scientificWorkId = 1u;

            var randomBase64 = "fasnljkbt432b634jhvk123j42=";

            var author = new User()
            {
                Id = 2,
                Photo = "asdf.png",
                Name = "John",
                Surname = "Smith",
                Degree = "Master of Science",
                University = "Polsl"
            };
            var reviewer1 = new User()
            {
                Id = 1
            };
            var reviewer2 = new User()
            {
                Id = 3
            };

            var scientificWork = new ScientificWork()
            {
                Id = scientificWorkId,
                Name = "Nice Work Title",
                Description = "Amazing work description",
                CreationDate = DateTime.UtcNow,
                OtherAuthors = "Thomas Unknown, Elisabeth Harmon",
                Status = StatusEnum.Accepted,
                MainAuthor = author,
                Versions = new List<ScientificWorkFile>()
                {
                    new ScientificWorkFile()
                    {
                        Id = 1,
                        Version = 1,
                        DateAdd = DateTime.UtcNow,
                        Reviews = new List<Review>()
                        {
                            new Review()
                            {
                                Id = 1,
                                DateReview = DateTime.UtcNow,
                                Comment = "Good job",
                                Rating = 2,
                                Reviewer = reviewer1
                            },
                            new Review()
                            {
                                Id = 2,
                                DateReview = DateTime.UtcNow,
                                File = "asdf.png",
                                Rating = 1,
                                Reviewer = reviewer2,
                                Answer = new Answer()
                                {
                                    Id = 1,
                                    Comment = "Ok",
                                    AnswerDate = DateTime.UtcNow,
                                    User = author
                                }
                            }
                        }
                    },
                    new ScientificWorkFile()
                    {
                        Id = 2,
                        Version = 2,
                        DateAdd = DateTime.UtcNow.AddDays(1),
                        Reviews = new List<Review>()
                        {
                            new Review()
                            {
                                Id = 3,
                                DateReview = DateTime.UtcNow,
                                File = "asgdbh.png",
                                Rating = 3,
                                Reviewer = reviewer1,
                                Answer = new Answer()
                                {
                                    Id = 1,
                                    Comment = "Thx",
                                    AnswerDate = DateTime.UtcNow,
                                    User = author
                                }
                            },
                            new Review()
                            {
                                Id = 4,
                                DateReview = DateTime.UtcNow,
                                Comment = "asfdknj",
                                Rating = 3,
                                Reviewer = reviewer2,
                            }
                        }
                    }
                }
            };

            ScientificWorkWithReviewDto scientificWorkWithReviewDto = null;

            var expectedDto = new ScientificWorkWithReviewDto()
            {
                Status = scientificWork.Status.ToString(),
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
                Mode = "Reviewer",
                MainAuthor = new UserDto()
                {
                    Degree = author.Degree,
                    Name = "John Smith",
                    Photo = $"data:image/png;base64,{randomBase64}",
                    University = author.University
                },
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
            };

            _scientificWorkRepositoryMock.Reset();
            _scientificWorkRepositoryMock.Setup(x => x.GetWorkByIdAsync(scientificWorkId)).ReturnsAsync(scientificWork);

            _scientificWorkFileRepositoryMock.Reset();
            _scientificWorkFileRepositoryMock.Setup(x => x.GetVersionsWithReviews(scientificWorkId)).ReturnsAsync(scientificWork.Versions);

            _reviewRepositoryMock.Reset();
            _reviewRepositoryMock.Setup(x => x.IsReviewerAsync(scientificWorkId, userId)).ReturnsAsync(true);

            _fileManagerMock.Reset();
            _fileManagerMock.Setup(x => x.GetBase64FileAsync(author.Photo)).ReturnsAsync(randomBase64);

            var err = await Record.ExceptionAsync(async
                () => scientificWorkWithReviewDto = await _service.GetWorkByIdAsync(userId, scientificWorkId));

            err.Should().BeNull();

            scientificWorkWithReviewDto.Should().NotBeNull();
            scientificWorkWithReviewDto.Should().BeEquivalentTo(expectedDto);

            _scientificWorkRepositoryMock.Verify(x => x.GetWorkByIdAsync(scientificWorkId), Times.Once);
            _scientificWorkFileRepositoryMock.Verify(x => x.GetVersionsWithReviews(scientificWorkId), Times.Once);
            _reviewRepositoryMock.Verify(x => x.IsReviewerAsync(scientificWorkId, userId), Times.Once);
            _fileManagerMock.Verify(x => x.GetBase64FileAsync(author.Photo), Times.Once);
        }

        [Fact]
        public async Task GetWorkByIdAsyncAuthorSeeEverything()
        {
            var userId = 2u;
            var scientificWorkId = 1u;

            var randomBase64 = "fasnljkbt432b634jhvk123j42=";

            var author = new User()
            {
                Id = 2,
                Photo = "asdf.png",
                Name = "John",
                Surname = "Smith",
                Degree = "Master of Science",
                University = "Polsl"
            };
            var reviewer1 = new User()
            {
                Id = 1
            };
            var reviewer2 = new User()
            {
                Id = 3
            };

            var scientificWork = new ScientificWork()
            {
                Id = scientificWorkId,
                Name = "Nice Work Title",
                Description = "Amazing work description",
                CreationDate = DateTime.UtcNow,
                OtherAuthors = "Thomas Unknown, Elisabeth Harmon",
                Status = StatusEnum.Accepted,
                MainAuthor = author,
                Versions = new List<ScientificWorkFile>()
                {
                    new ScientificWorkFile()
                    {
                        Id = 1,
                        Version = 1,
                        DateAdd = DateTime.UtcNow,
                        Reviews = new List<Review>()
                        {
                            new Review()
                            {
                                Id = 1,
                                DateReview = DateTime.UtcNow,
                                Comment = "Good job",
                                Rating = 2,
                                Reviewer = reviewer1
                            },
                            new Review()
                            {
                                Id = 2,
                                DateReview = DateTime.UtcNow,
                                File = "asdf.png",
                                Rating = 1,
                                Reviewer = reviewer2,
                                Answer = new Answer()
                                {
                                    Id = 1,
                                    Comment = "Ok",
                                    AnswerDate = DateTime.UtcNow,
                                    User = author
                                }
                            }
                        }
                    },
                    new ScientificWorkFile()
                    {
                        Id = 2,
                        Version = 2,
                        DateAdd = DateTime.UtcNow.AddDays(1),
                        Reviews = new List<Review>()
                        {
                            new Review()
                            {
                                Id = 3,
                                DateReview = DateTime.UtcNow,
                                File = "asgdbh.png",
                                Rating = 3,
                                Reviewer = reviewer1,
                                Answer = new Answer()
                                {
                                    Id = 1,
                                    Comment = "Thx",
                                    AnswerDate = DateTime.UtcNow,
                                    User = author
                                }
                            },
                            new Review()
                            {
                                Id = 4,
                                DateReview = DateTime.UtcNow,
                                Comment = "asfdknj",
                                Rating = 3,
                                Reviewer = reviewer2,
                            }
                        }
                    }
                }
            };

            ScientificWorkWithReviewDto scientificWorkWithReviewDto = null;

            var expectedDto = new ScientificWorkWithReviewDto()
            {
                Status = scientificWork.Status.ToString(),
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
                },
                Mode = "Author",
                MainAuthor = new UserDto()
                {
                    Degree = author.Degree,
                    Name = "John Smith",
                    Photo = $"data:image/png;base64,{randomBase64}",
                    University = author.University
                },
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
            };

            _scientificWorkRepositoryMock.Reset();
            _scientificWorkRepositoryMock.Setup(x => x.GetWorkByIdAsync(scientificWorkId)).ReturnsAsync(scientificWork);

            _scientificWorkFileRepositoryMock.Reset();
            _scientificWorkFileRepositoryMock.Setup(x => x.GetVersionsWithReviews(scientificWorkId)).ReturnsAsync(scientificWork.Versions);

            _reviewRepositoryMock.Reset();

            _fileManagerMock.Reset();
            _fileManagerMock.Setup(x => x.GetBase64FileAsync(author.Photo)).ReturnsAsync(randomBase64);

            var err = await Record.ExceptionAsync(async
                () => scientificWorkWithReviewDto = await _service.GetWorkByIdAsync(userId, scientificWorkId));

            err.Should().BeNull();

            scientificWorkWithReviewDto.Should().NotBeNull();
            scientificWorkWithReviewDto.Should().BeEquivalentTo(expectedDto);

            _scientificWorkRepositoryMock.Verify(x => x.GetWorkByIdAsync(scientificWorkId), Times.Once);
            _scientificWorkFileRepositoryMock.Verify(x => x.GetVersionsWithReviews(scientificWorkId), Times.Once);
            _reviewRepositoryMock.Verify(x => x.IsReviewerAsync(It.IsAny<uint>(), It.IsAny<uint>()), Times.Never);
            _fileManagerMock.Verify(x => x.GetBase64FileAsync(author.Photo), Times.Once);
        }
    }
}

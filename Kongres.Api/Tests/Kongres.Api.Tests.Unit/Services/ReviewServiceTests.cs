using Bogus;
using FluentAssertions;
using Kongres.Api.Application.Services;
using Kongres.Api.Application.Services.Interfaces;
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
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Xunit;

namespace Kongres.Api.Tests.Unit.Services
{
    public class ReviewServiceTests : IDisposable
    {
        private readonly Mock<IScientificWorkRepository> _scientificWorkRepositoryMock = new Mock<IScientificWorkRepository>();
        private readonly Mock<IScientificWorkFileRepository> _scientificWorkFileRepositoryMock = new Mock<IScientificWorkFileRepository>();
        private readonly Mock<IReviewerScientificWorkRepository> _reviewersWorkRepositoryMock = new Mock<IReviewerScientificWorkRepository>();
        private readonly Mock<IReviewRepository> _reviewRepositoryMock = new Mock<IReviewRepository>();
        private readonly Mock<IFileManager> _fileManagerMock = new Mock<IFileManager>();
        private readonly Mock<IEmailSender> _emailSenderMock = new Mock<IEmailSender>();
        private readonly Mock<IUserStore<User>> _userStoreMock = new Mock<IUserStore<User>>();
        private readonly Faker _faker = new Faker();
        private readonly UserManager<User> _userManager;
        private readonly IReviewService _service;

        public ReviewServiceTests()
        {
            _userManager = new UserManager<User>(_userStoreMock.Object, null, null, null, null, null, null, null, null);

            _service = new ReviewService(_scientificWorkRepositoryMock.Object,
                                                _scientificWorkFileRepositoryMock.Object,
                                                _reviewersWorkRepositoryMock.Object,
                                                _reviewRepositoryMock.Object,
                                                _fileManagerMock.Object,
                                                _userManager,
                                                _emailSenderMock.Object);
        }

        public void Dispose()
        {
            _scientificWorkRepositoryMock.Reset();
            _scientificWorkFileRepositoryMock.Reset();
            _reviewersWorkRepositoryMock.Reset();
            _reviewRepositoryMock.Reset();
            _fileManagerMock.Reset();
            _emailSenderMock.Reset();
            _userStoreMock.Reset();
        }

        [Fact]
        public async Task AddAnswerToReviewAsyncUserIsNotAuthorDoNothing()
        {
            var userId = 1u;
            var reviewId = 1u;
            var asnwerMsg = _faker.Lorem.Paragraph();

            _scientificWorkRepositoryMock.Setup(x => x.IsAuthorOfScientificWorkByReviewIdAsync(userId, reviewId)).ReturnsAsync(false);

            var err = await Record.ExceptionAsync(async
                () => await _service.AddAnswerToReviewAsync(userId, reviewId, asnwerMsg));

            err.Should().BeNull();

            _emailSenderMock.Verify(x => x.SendReceiveAnswerEmailAsync(It.IsAny<string>(), It.IsAny<uint>()), Times.Never);
            _reviewRepositoryMock.Verify(x => x.AddAnswerToReviewAsync(It.IsAny<Review>()), Times.Never);
        }

        [Fact]
        public async Task AddAnswerToReviewAsyncReviewAlreadyHaveAnswerDoNothing()
        {
            var userId = 1u;
            var reviewId = 1u;
            var asnwerMsg = _faker.Lorem.Paragraph();

            _scientificWorkRepositoryMock.Setup(x => x.IsAuthorOfScientificWorkByReviewIdAsync(userId, reviewId)).ReturnsAsync(true);
            _reviewRepositoryMock.Setup(x => x.GetReviewByIdAsync(reviewId)).ReturnsAsync(new Review() { Answer = new Answer() });

            var err = await Record.ExceptionAsync(async
                () => await _service.AddAnswerToReviewAsync(userId, reviewId, asnwerMsg));

            err.Should().BeNull();

            _reviewRepositoryMock.Verify(x => x.GetReviewByIdAsync(reviewId));
            _emailSenderMock.Verify(x => x.SendReceiveAnswerEmailAsync(It.IsAny<string>(), It.IsAny<uint>()), Times.Never);
            _reviewRepositoryMock.Verify(x => x.AddAnswerToReviewAsync(It.IsAny<Review>()), Times.Never);
        }

        [Fact]
        public async Task AddAnswerToReviewAsyncEverythingIsOkSendNotificationAsEmail()
        {
            var userId = 1u;
            var reviewId = 1u;
            var scientificWorkId = 1u;

            var asnwerMsg = _faker.Lorem.Paragraph();
            var reviewerEmail = _faker.Internet.Email();

            var user = new User() { Id = userId };

            _scientificWorkRepositoryMock.Setup(x => x.IsAuthorOfScientificWorkByReviewIdAsync(userId, reviewId)).ReturnsAsync(true);

            _reviewRepositoryMock.Setup(x => x.GetReviewByIdAsync(reviewId)).ReturnsAsync(new Review());
            _reviewRepositoryMock.Setup(x => x.GetWorkIdByReviewIdAsync(reviewId)).ReturnsAsync(scientificWorkId);
            _reviewRepositoryMock.Setup(x => x.GetEmailOfReviewerByReviewIdAsync(reviewId)).ReturnsAsync(reviewerEmail);

            _userStoreMock.Setup(x => x.FindByIdAsync(userId.ToString(), CancellationToken.None)).ReturnsAsync(user);

            var err = await Record.ExceptionAsync(async
                () => await _service.AddAnswerToReviewAsync(userId, reviewId, asnwerMsg));

            err.Should().BeNull();

            _emailSenderMock.Verify(x => x.SendReceiveAnswerEmailAsync(reviewerEmail, scientificWorkId), Times.Once);
        }

        [Fact]
        public async Task AddAnswerToReviewAsyncEverythingIsOkAddAnswerToDatabase()
        {
            var userId = 1u;
            var reviewId = 1u;
            var scientificWorkId = 1u;

            var asnwerMsg = _faker.Lorem.Paragraph();
            var reviewerEmail = _faker.Internet.Email();

            var user = new User() { Id = userId };

            _scientificWorkRepositoryMock.Setup(x => x.IsAuthorOfScientificWorkByReviewIdAsync(userId, reviewId)).ReturnsAsync(true);

            _reviewRepositoryMock.Setup(x => x.GetReviewByIdAsync(reviewId)).ReturnsAsync(new Review());
            _reviewRepositoryMock.Setup(x => x.AddAnswerToReviewAsync(It.IsAny<Review>()));
            _reviewRepositoryMock.Setup(x => x.GetWorkIdByReviewIdAsync(reviewId)).ReturnsAsync(scientificWorkId);
            _reviewRepositoryMock.Setup(x => x.GetEmailOfReviewerByReviewIdAsync(reviewId)).ReturnsAsync(reviewerEmail);

            _userStoreMock.Setup(x => x.FindByIdAsync(userId.ToString(), CancellationToken.None)).ReturnsAsync(user);

            var err = await Record.ExceptionAsync(async
                () => await _service.AddAnswerToReviewAsync(userId, reviewId, asnwerMsg));

            err.Should().BeNull();

            _reviewRepositoryMock.Verify(x => x.AddAnswerToReviewAsync(It.Is<Review>(y => y.Answer.User == user && y.Answer.Comment == asnwerMsg)), Times.Once);
        }

        [Fact]
        public async Task AddReviewAsyncUserIsNotReviewerOfWorkDoNothing()
        {
            var reviewerId = 1u;
            var scientificWorkId = 2u;
            var reviewMsg = _faker.Rant.Review();
            var rating = _faker.Random.Byte(1, 3);
            var reviewFile = new FormFile(null, _faker.Random.Long(), _faker.Random.Long(), _faker.Internet.UserName(), _faker.System.FileName("pdf"));

            _reviewersWorkRepositoryMock.Setup(x => x.IsReviewerOfScientificWorkAsync(reviewerId, scientificWorkId)).ReturnsAsync(false);

            var err = await Record.ExceptionAsync(async
                () => await _service.AddReviewAsync(reviewerId, reviewMsg, reviewFile, rating, scientificWorkId));

            err.Should().BeNull();

            _reviewRepositoryMock.Verify(x => x.AddReviewAsync(It.IsAny<Review>()), Times.Never);
            _emailSenderMock.VerifyNoOtherCalls();
        }

        [Fact]
        public async Task AddReviewAsyncWorkAlreadyHaveReviewFromThisUserDoNothing()
        {
            var reviewerId = 1u;
            var scientificWorkId = 2u;
            var reviewMsg = _faker.Rant.Review();
            var rating = _faker.Random.Byte(1, 3);
            var reviewFile = new FormFile(null, _faker.Random.Long(), _faker.Random.Long(), _faker.Internet.UserName(), _faker.System.FileName("pdf"));

            var scientificWork = new ScientificWorkFile()
            {
                Reviews = new List<Review>()
                {
                    new Review()
                    {
                        Reviewer = new User()
                        {
                            Id = reviewerId
                        }
                    }
                }
            };

            _reviewersWorkRepositoryMock.Setup(x => x.IsReviewerOfScientificWorkAsync(reviewerId, scientificWorkId)).ReturnsAsync(true);
            _scientificWorkFileRepositoryMock.Setup(x => x.GetNewestVersionWithReviewsAsync(scientificWorkId)).ReturnsAsync(scientificWork);

            var err = await Record.ExceptionAsync(async
                () => await _service.AddReviewAsync(reviewerId, reviewMsg, reviewFile, rating, scientificWorkId));

            err.Should().BeNull();

            _reviewRepositoryMock.Verify(x => x.AddReviewAsync(It.IsAny<Review>()), Times.Never);
            _emailSenderMock.VerifyNoOtherCalls();
        }

        [Fact]
        public async Task AddReviewAsyncAddReviewIsNotTheLastSaveReviewFile()
        {
            var reviewerId = 1u;
            var scientificWorkId = 2u;

            var reviewMsg = _faker.Rant.Review();
            var rating = _faker.Random.Byte(1, 3);
            var authorEmail = _faker.Internet.Email();
            var randomFileName = _faker.System.FileName(".pdf");
            IFormFile reviewFile = new FormFile(null, 0, 0, "", "");

            var version = new ScientificWorkFile()
            {
                Reviews = new List<Review>()
            };

            var reviewer = new User()
            {
                Id = reviewerId
            };

            var reviewerCount = 3;
            var reviewsCount = 1;

            _scientificWorkFileRepositoryMock.Setup(x => x.GetNewestVersionWithReviewsAsync(scientificWorkId)).ReturnsAsync(version);
            _scientificWorkFileRepositoryMock.Setup(x => x.GetReviewsCountInNewestVersion(scientificWorkId)).Returns(reviewsCount);

            _userStoreMock.Setup(x => x.FindByIdAsync(reviewerId.ToString(), CancellationToken.None)).ReturnsAsync(reviewer);

            _fileManagerMock.Setup(x => x.SaveFileAsync(reviewFile)).ReturnsAsync(randomFileName);

            _reviewersWorkRepositoryMock.Setup(x => x.GetReviewersCount(scientificWorkId)).Returns(reviewerCount);
            _reviewersWorkRepositoryMock.Setup(x => x.IsReviewerOfScientificWorkAsync(reviewerId, scientificWorkId)).ReturnsAsync(true);

            _reviewRepositoryMock.Setup(x => x.AddReviewAsync(It.Is<Review>(y => y.Reviewer == reviewer &&
                                                                                 y.Rating == rating &&
                                                                                 y.File == randomFileName &&
                                                                                 y.VersionOfScientificWork == version)));

            var err = await Record.ExceptionAsync(async
                () => await _service.AddReviewAsync(reviewerId, reviewMsg, reviewFile, rating, scientificWorkId));

            err.Should().BeNull();

            _scientificWorkFileRepositoryMock.Verify(x => x.GetRatingSumFromVersion(It.IsAny<uint>()), Times.Never);
            _fileManagerMock.Verify(x => x.SaveFileAsync(reviewFile), Times.Once);
            _reviewRepositoryMock.Verify(x => x.AddReviewAsync(It.Is<Review>(y => y.Reviewer == reviewer &&
                                                                                  y.Rating == rating &&
                                                                                  y.File == randomFileName &&
                                                                                  y.VersionOfScientificWork == version)), Times.Once);
        }

        [Fact]
        public async Task AddReviewAsyncAddReviewIsNotTheLastOneOnlyAddToDatabase()
        {
            var reviewerId = 1u;
            var scientificWorkId = 2u;

            var reviewMsg = _faker.Rant.Review();
            var rating = _faker.Random.Byte(1, 3);
            var authorEmail = _faker.Internet.Email();
            IFormFile reviewFile = null;

            var version = new ScientificWorkFile()
            {
                Reviews = new List<Review>()
            };

            var reviewer = new User()
            {
                Id = reviewerId
            };

            var reviewerCount = 3;
            var reviewsCount = 1;

            _scientificWorkRepositoryMock.Setup(x => x.GetEmailOfAuthorByWorkIdAsync(scientificWorkId)).ReturnsAsync(authorEmail);

            _scientificWorkFileRepositoryMock.Setup(x => x.GetNewestVersionWithReviewsAsync(scientificWorkId)).ReturnsAsync(version);
            _scientificWorkFileRepositoryMock.Setup(x => x.GetReviewsCountInNewestVersion(scientificWorkId)).Returns(reviewsCount);

            _userStoreMock.Setup(x => x.FindByIdAsync(reviewerId.ToString(), CancellationToken.None)).ReturnsAsync(reviewer);

            _reviewersWorkRepositoryMock.Setup(x => x.GetReviewersCount(scientificWorkId)).Returns(reviewerCount);
            _reviewersWorkRepositoryMock.Setup(x => x.IsReviewerOfScientificWorkAsync(reviewerId, scientificWorkId)).ReturnsAsync(true);

            _reviewRepositoryMock.Setup(x => x.AddReviewAsync(It.Is<Review>(y => y.Reviewer == reviewer &&
                                                                                 y.Rating == rating &&
                                                                                 y.VersionOfScientificWork == version)));

            var err = await Record.ExceptionAsync(async
                () => await _service.AddReviewAsync(reviewerId, reviewMsg, reviewFile, rating, scientificWorkId));

            err.Should().BeNull();

            _scientificWorkFileRepositoryMock.Verify(x => x.GetRatingSumFromVersion(It.IsAny<uint>()), Times.Never);
            _reviewRepositoryMock.Verify(x => x.AddReviewAsync(It.Is<Review>(y => y.Reviewer == reviewer &&
                                                                                  y.Rating == rating &&
                                                                                  y.VersionOfScientificWork == version)), Times.Once);
        }

        [Fact]
        public async Task AddReviewAsyncAllReviewersAddedTheirReviewsWhileRatingIsLowSetRejectedStatusAndSendEmail()
        {
            var reviewerId = 1u;
            var reviewMsg = _faker.Rant.Review();
            IFormFile reviewFile = null;
            var rating = _faker.Random.Byte(1, 3);
            var scientificWorkId = 2u;

            var version = new ScientificWorkFile()
            {
                Id = 3,
                Reviews = new List<Review>()
            };

            var reviewer = new User() { Id = reviewerId };

            var reviewerCount = 3;
            var reviewsCount = 3;

            var authorEmail = _faker.Internet.Email();

            var ratingSum = 4;

            var scientificWork = new ScientificWork() { Status = StatusEnum.UnderReview };

            _scientificWorkRepositoryMock.Setup(x => x.GetEmailOfAuthorByWorkIdAsync(scientificWorkId)).ReturnsAsync(authorEmail);
            _scientificWorkRepositoryMock.Setup(x => x.GetWorkByIdAsync(scientificWorkId)).ReturnsAsync(scientificWork);
            _scientificWorkRepositoryMock.Setup(x => x.ChangeStatusAsync(It.Is<ScientificWork>(y => y.Status == StatusEnum.Rejected)));

            _scientificWorkFileRepositoryMock.Setup(x => x.GetNewestVersionWithReviewsAsync(scientificWorkId)).ReturnsAsync(version);
            _scientificWorkFileRepositoryMock.Setup(x => x.GetReviewsCountInNewestVersion(scientificWorkId)).Returns(reviewsCount);
            _scientificWorkFileRepositoryMock.Setup(x => x.GetRatingSumFromVersion(version.Id)).ReturnsAsync(ratingSum);
            _scientificWorkFileRepositoryMock.Setup(x => x.AddRatingAsync(It.Is<ScientificWorkFile>(y => y.Rating == 1)));

            _userStoreMock.Setup(x => x.FindByIdAsync(reviewerId.ToString(), CancellationToken.None)).ReturnsAsync(reviewer);

            _reviewRepositoryMock.Setup(x => x.AddReviewAsync(It.Is<Review>(y => y.Reviewer == reviewer &&
                                                                                 y.Rating == rating &&
                                                                                 y.VersionOfScientificWork == version)));

            _reviewersWorkRepositoryMock.Setup(x => x.GetReviewersCount(scientificWorkId)).Returns(reviewerCount);
            _reviewersWorkRepositoryMock.Setup(x => x.IsReviewerOfScientificWorkAsync(reviewerId, scientificWorkId)).ReturnsAsync(true);

            _emailSenderMock.Setup(x => x.SendToAuthorWorkGotRejectedAsync(authorEmail, scientificWorkId));

            var err = await Record.ExceptionAsync(async
                () => await _service.AddReviewAsync(reviewerId, reviewMsg, reviewFile, rating, scientificWorkId));

            err.Should().BeNull();

            _emailSenderMock.Verify(x => x.SendToAuthorWorkGotRejectedAsync(authorEmail, scientificWorkId), Times.Once);
            _scientificWorkFileRepositoryMock.Verify(x => x.AddRatingAsync(It.Is<ScientificWorkFile>(y => y.Rating == 1)), Times.Once);
            _scientificWorkRepositoryMock.Verify(x => x.ChangeStatusAsync(It.Is<ScientificWork>(y => y.Status == StatusEnum.Rejected)), Times.Once);
        }

        [Fact]
        public async Task AddReviewAsyncAllReviewersAddedTheirReviewsWhileRatingIsLowSetCorrectingStatusAndSendEmail()
        {
            var reviewerId = 1u;
            var reviewMsg = _faker.Rant.Review();
            var rating = _faker.Random.Byte(1, 3);
            IFormFile reviewFile = null;
            var scientificWorkId = 2u;

            var version = new ScientificWorkFile()
            {
                Id = 3,
                Reviews = new List<Review>()
            };

            var reviewer = new User() { Id = reviewerId };

            var reviewerCount = 3;
            var reviewsCount = 3;

            var authorEmail = _faker.Internet.Email();

            var ratingSum = 6;

            var scientificWork = new ScientificWork() { Status = StatusEnum.UnderReview };

            _scientificWorkRepositoryMock.Setup(x => x.GetEmailOfAuthorByWorkIdAsync(scientificWorkId)).ReturnsAsync(authorEmail);
            _scientificWorkRepositoryMock.Setup(x => x.GetWorkByIdAsync(scientificWorkId)).ReturnsAsync(scientificWork);
            _scientificWorkRepositoryMock.Setup(x => x.ChangeStatusAsync(It.Is<ScientificWork>(y => y.Status == StatusEnum.Correcting)));

            _scientificWorkFileRepositoryMock.Setup(x => x.GetNewestVersionWithReviewsAsync(scientificWorkId)).ReturnsAsync(version);
            _scientificWorkFileRepositoryMock.Setup(x => x.GetReviewsCountInNewestVersion(scientificWorkId)).Returns(reviewsCount);
            _scientificWorkFileRepositoryMock.Setup(x => x.GetRatingSumFromVersion(version.Id)).ReturnsAsync(ratingSum);
            _scientificWorkFileRepositoryMock.Setup(x => x.AddRatingAsync(It.Is<ScientificWorkFile>(y => y.Rating == 2)));

            _userStoreMock.Setup(x => x.FindByIdAsync(reviewerId.ToString(), CancellationToken.None)).ReturnsAsync(reviewer);

            _reviewRepositoryMock.Setup(x => x.AddReviewAsync(It.Is<Review>(y => y.Reviewer == reviewer &&
                                                                                 y.Rating == rating &&
                                                                                 y.VersionOfScientificWork == version)));

            _reviewersWorkRepositoryMock.Setup(x => x.GetReviewersCount(scientificWorkId)).Returns(reviewerCount);
            _reviewersWorkRepositoryMock.Setup(x => x.IsReviewerOfScientificWorkAsync(reviewerId, scientificWorkId)).ReturnsAsync(true);

            _emailSenderMock.Setup(x => x.SendNewVersionEnabledEmailAsync(authorEmail, scientificWorkId));

            var err = await Record.ExceptionAsync(async
                () => await _service.AddReviewAsync(reviewerId, reviewMsg, reviewFile, rating, scientificWorkId));

            err.Should().BeNull();

            _emailSenderMock.Verify(x => x.SendNewVersionEnabledEmailAsync(authorEmail, scientificWorkId), Times.Once);
            _scientificWorkFileRepositoryMock.Verify(x => x.AddRatingAsync(It.Is<ScientificWorkFile>(y => y.Rating == 2)), Times.Once);
            _scientificWorkRepositoryMock.Verify(x => x.ChangeStatusAsync(It.Is<ScientificWork>(y => y.Status == StatusEnum.Correcting)), Times.Once);
        }

        [Fact]
        public async Task AddReviewAsyncAllReviewersAddedTheirReviewsWhileRatingIsLowSetAcceptedStatusAndSendEmail()
        {
            var reviewerId = 1u;
            var reviewMsg = _faker.Rant.Review();
            var rating = _faker.Random.Byte(1, 3);
            IFormFile reviewFile = null;
            var scientificWorkId = 2u;

            var version = new ScientificWorkFile()
            {
                Id = 3,
                Reviews = new List<Review>()
            };

            var reviewer = new User() { Id = reviewerId };

            var reviewerCount = 3;
            var reviewsCount = 3;

            var authorEmail = _faker.Internet.Email();

            var ratingSum = 9;

            var scientificWork = new ScientificWork() { Status = StatusEnum.UnderReview };

            _scientificWorkRepositoryMock.Setup(x => x.GetEmailOfAuthorByWorkIdAsync(scientificWorkId)).ReturnsAsync(authorEmail);
            _scientificWorkRepositoryMock.Setup(x => x.GetWorkByIdAsync(scientificWorkId)).ReturnsAsync(scientificWork);
            _scientificWorkRepositoryMock.Setup(x => x.ChangeStatusAsync(It.Is<ScientificWork>(y => y.Status == StatusEnum.Accepted)));

            _scientificWorkFileRepositoryMock.Setup(x => x.GetNewestVersionWithReviewsAsync(scientificWorkId)).ReturnsAsync(version);
            _scientificWorkFileRepositoryMock.Setup(x => x.GetReviewsCountInNewestVersion(scientificWorkId)).Returns(reviewsCount);
            _scientificWorkFileRepositoryMock.Setup(x => x.GetRatingSumFromVersion(version.Id)).ReturnsAsync(ratingSum);
            _scientificWorkFileRepositoryMock.Setup(x => x.AddRatingAsync(It.Is<ScientificWorkFile>(y => y.Rating == 3)));

            _userStoreMock.Setup(x => x.FindByIdAsync(reviewerId.ToString(), CancellationToken.None)).ReturnsAsync(reviewer);

            _reviewRepositoryMock.Setup(x => x.AddReviewAsync(It.Is<Review>(y => y.Reviewer == reviewer &&
                                                                                 y.Rating == rating &&
                                                                                 y.VersionOfScientificWork == version)));

            _reviewersWorkRepositoryMock.Setup(x => x.GetReviewersCount(scientificWorkId)).Returns(reviewerCount);
            _reviewersWorkRepositoryMock.Setup(x => x.IsReviewerOfScientificWorkAsync(reviewerId, scientificWorkId)).ReturnsAsync(true);

            _emailSenderMock.Setup(x => x.SendToAuthorWorkGotAcceptedAsync(authorEmail, scientificWorkId));

            var err = await Record.ExceptionAsync(async
                () => await _service.AddReviewAsync(reviewerId, reviewMsg, reviewFile, rating, scientificWorkId));

            err.Should().BeNull();

            _emailSenderMock.Verify(x => x.SendToAuthorWorkGotAcceptedAsync(authorEmail, scientificWorkId), Times.Once);
            _scientificWorkFileRepositoryMock.Verify(x => x.AddRatingAsync(It.Is<ScientificWorkFile>(y => y.Rating == 3)), Times.Once);
            _scientificWorkRepositoryMock.Verify(x => x.ChangeStatusAsync(It.Is<ScientificWork>(y => y.Status == StatusEnum.Accepted)), Times.Once);
        }

        [Fact]
        public async Task GetStreamOfReviewFileAsyncUserIsParticipantReturnNull()
        {
            var userId = 1u;
            var reviewId = 2u;

            Stream returnedStream = null;

            _scientificWorkRepositoryMock.Setup(x => x.IsAuthorOfScientificWorkByReviewIdAsync(userId, reviewId)).ReturnsAsync(false);
            _reviewRepositoryMock.Setup(x => x.IsAuthorOfReview(userId, reviewId)).ReturnsAsync(false);

            var err = await Record.ExceptionAsync(async
                () => returnedStream = await _service.GetStreamOfReviewFileAsync(userId, reviewId));

            err.Should().BeNull();
            returnedStream.Should().BeNull();

            _reviewRepositoryMock.Verify(x => x.GetReviewByIdAsync(It.IsAny<uint>()), Times.Never);
        }

        [Fact]
        public async Task GetStreamOfReviewFileAsyncUserIsAuthorReturnStream()
        {
            var userId = 1u;
            var reviewId = 2u;

            var review = new Review()
            {
                File = _faker.System.FileName("pdf")
            };

            var streamOfFile = new MemoryStream(Encoding.UTF8.GetBytes(_faker.Random.String(7)));

            Stream returnedStream = null;

            _scientificWorkRepositoryMock.Setup(x => x.IsAuthorOfScientificWorkByReviewIdAsync(userId, reviewId)).ReturnsAsync(true);
            _reviewRepositoryMock.Setup(x => x.GetReviewByIdAsync(reviewId)).ReturnsAsync(review);
            _fileManagerMock.Setup(x => x.GetStreamOfFile(review.File)).Returns(streamOfFile);

            var err = await Record.ExceptionAsync(async
                () => returnedStream = await _service.GetStreamOfReviewFileAsync(userId, reviewId));

            err.Should().BeNull();
            returnedStream.Should().BeEquivalentTo(streamOfFile);

            _reviewRepositoryMock.Verify(x => x.GetReviewByIdAsync(reviewId), Times.Once);
        }

        [Fact]
        public async Task GetStreamOfReviewFileAsyncUserIsReviewerReturnStream()
        {
            var userId = 1u;
            var reviewId = 2u;

            var review = new Review()
            {
                File = _faker.System.FileName("pdf")
            };

            var streamOfFile = new MemoryStream(Encoding.UTF8.GetBytes(_faker.Random.String(7)));

            Stream returnedStream = null;

            _scientificWorkRepositoryMock.Setup(x => x.IsAuthorOfScientificWorkByReviewIdAsync(userId, reviewId)).ReturnsAsync(false);
            _reviewRepositoryMock.Setup(x => x.IsAuthorOfReview(userId, reviewId)).ReturnsAsync(true);
            _reviewRepositoryMock.Setup(x => x.GetReviewByIdAsync(reviewId)).ReturnsAsync(review);
            _fileManagerMock.Setup(x => x.GetStreamOfFile(review.File)).Returns(streamOfFile);

            var err = await Record.ExceptionAsync(async
                () => returnedStream = await _service.GetStreamOfReviewFileAsync(userId, reviewId));

            err.Should().BeNull();
            returnedStream.Should().BeEquivalentTo(streamOfFile);

            _reviewRepositoryMock.Verify(x => x.GetReviewByIdAsync(reviewId), Times.Once);
        }

        [Fact]
        public async Task GetStreamOfReviewFileAsyncReturnNullWhenFileDoesNotExists()
        {
            var userId = 1u;
            var reviewId = 2u;

            var review = new Review() { File = null };

            Stream returnedStream = null;

            _scientificWorkRepositoryMock.Setup(x => x.IsAuthorOfScientificWorkByReviewIdAsync(userId, reviewId)).ReturnsAsync(true);
            _reviewRepositoryMock.Setup(x => x.GetReviewByIdAsync(reviewId)).ReturnsAsync(review);
            _fileManagerMock.Setup(x => x.GetStreamOfFile(review.File));

            var err = await Record.ExceptionAsync(async
                () => returnedStream = await _service.GetStreamOfReviewFileAsync(userId, reviewId));

            err.Should().BeNull();
            returnedStream.Should().BeNull();

            _reviewRepositoryMock.Verify(x => x.GetReviewByIdAsync(reviewId), Times.Once);
        }
    }
}

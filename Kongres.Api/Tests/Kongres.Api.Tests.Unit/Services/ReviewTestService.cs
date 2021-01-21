using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
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
using Xunit;

namespace Kongres.Api.Tests.Unit.Services
{
    public class ReviewTestService
    {
        private readonly Mock<IScientificWorkRepository> _scientificWorkRepositoryMock;
        private readonly Mock<IScientificWorkFileRepository> _scientificWorkFileRepositoryMock;
        private readonly Mock<IReviewerScientificWorkRepository> _reviewersWorkRepositoryMock;
        private readonly Mock<IReviewRepository> _reviewRepositoryMock;
        private readonly Mock<IFileManager> _fileManagerMock;
        private readonly Mock<IEmailSender> _emailSenderMock;
        private readonly Mock<IUserStore<User>> _userStoreMock;
        private readonly UserManager<User> _userManager;
        private readonly IReviewService _service;

        public ReviewTestService()
        {
            _scientificWorkRepositoryMock = new Mock<IScientificWorkRepository>();
            _scientificWorkFileRepositoryMock = new Mock<IScientificWorkFileRepository>();
            _reviewersWorkRepositoryMock = new Mock<IReviewerScientificWorkRepository>();
            _reviewRepositoryMock = new Mock<IReviewRepository>();
            _fileManagerMock = new Mock<IFileManager>();
            _emailSenderMock = new Mock<IEmailSender>();
            _userStoreMock = new Mock<IUserStore<User>>();

            _userManager = new UserManager<User>(_userStoreMock.Object, null, null, null, null, null, null, null, null);

            _service = new ReviewService(_scientificWorkRepositoryMock.Object,
                                                _scientificWorkFileRepositoryMock.Object,
                                                _reviewersWorkRepositoryMock.Object,
                                                _reviewRepositoryMock.Object,
                                                _fileManagerMock.Object,
                                                _userManager,
                                                _emailSenderMock.Object);
        }

        [Fact]
        public async Task AddAnswerToReviewAsyncUserIsNotAuthorDoNothing()
        {
            var userId = 1u;
            var reviewId = 2u;
            var asnwerMsg = "Hello, my friend";

            _scientificWorkRepositoryMock.Reset();
            _scientificWorkRepositoryMock.Setup(x => x.IsAuthorOfScientificWorkByReviewIdAsync(userId, reviewId)).ReturnsAsync(false);

            _reviewRepositoryMock.Reset();
            _userStoreMock.Reset();
            _emailSenderMock.Reset();

            var err = await Record.ExceptionAsync(async
                () => await _service.AddAnswerToReviewAsync(userId, reviewId, asnwerMsg));

            err.Should().BeNull();

            _scientificWorkRepositoryMock.Verify(x => x.IsAuthorOfScientificWorkByReviewIdAsync(userId, reviewId), Times.Once);
            _reviewRepositoryMock.Verify(x => x.GetReviewByIdAsync(It.IsAny<uint>()), Times.Never);
            _reviewRepositoryMock.Verify(x => x.AddAnswerToReviewAsync(It.IsAny<Review>()), Times.Never);
            _reviewRepositoryMock.Verify(x => x.GetWorkIdByReviewIdAsync(It.IsAny<uint>()), Times.Never);
            _reviewRepositoryMock.Verify(x => x.GetEmailOfReviewerByReviewIdAsync(It.IsAny<uint>()), Times.Never);
            _emailSenderMock.Verify(x => x.SendReceiveAnswerEmailAsync(It.IsAny<string>(), It.IsAny<uint>()), Times.Never);
        }

        [Fact]
        public async Task AddAnswerToReviewAsyncReviewAlreadyHaveAnswerDoNothing()
        {
            var userId = 1u;
            var reviewId = 2u;
            var asnwerMsg = "Hello, my friend";

            _scientificWorkRepositoryMock.Reset();
            _scientificWorkRepositoryMock.Setup(x => x.IsAuthorOfScientificWorkByReviewIdAsync(userId, reviewId)).ReturnsAsync(true);

            _reviewRepositoryMock.Reset();
            _reviewRepositoryMock.Setup(x => x.GetReviewByIdAsync(reviewId)).ReturnsAsync(new Review() { Answer = new Answer() });

            _userStoreMock.Reset();
            _emailSenderMock.Reset();

            var err = await Record.ExceptionAsync(async
                () => await _service.AddAnswerToReviewAsync(userId, reviewId, asnwerMsg));

            err.Should().BeNull();

            _scientificWorkRepositoryMock.Verify(x => x.IsAuthorOfScientificWorkByReviewIdAsync(userId, reviewId), Times.Once);
            _reviewRepositoryMock.Verify(x => x.GetReviewByIdAsync(reviewId), Times.Once);
            _reviewRepositoryMock.Verify(x => x.AddAnswerToReviewAsync(It.IsAny<Review>()), Times.Never);
            _reviewRepositoryMock.Verify(x => x.GetWorkIdByReviewIdAsync(It.IsAny<uint>()), Times.Never);
            _reviewRepositoryMock.Verify(x => x.GetEmailOfReviewerByReviewIdAsync(It.IsAny<uint>()), Times.Never);
            _emailSenderMock.Verify(x => x.SendReceiveAnswerEmailAsync(It.IsAny<string>(), It.IsAny<uint>()), Times.Never);
        }

        [Fact]
        public async Task AddAnswerToReviewAsyncAddAnswerSuccess()
        {
            var userId = 1u;
            var reviewId = 2u;
            var asnwerMsg = "Hello, my friend";

            var review = new Review() { Answer = null };

            var user = new User() { Id = userId };

            var scientificWorkId = 3u;
            var reviewerEmail = "First@email.com";

            _scientificWorkRepositoryMock.Reset();
            _scientificWorkRepositoryMock.Setup(x => x.IsAuthorOfScientificWorkByReviewIdAsync(userId, reviewId)).ReturnsAsync(true);

            _reviewRepositoryMock.Reset();
            _reviewRepositoryMock.Setup(x => x.GetReviewByIdAsync(reviewId)).ReturnsAsync(review);
            _reviewRepositoryMock.Setup(x => x.AddAnswerToReviewAsync(It.Is<Review>(y => y.Answer.User == user && y.Answer.Comment == asnwerMsg)));
            _reviewRepositoryMock.Setup(x => x.GetWorkIdByReviewIdAsync(reviewId)).ReturnsAsync(scientificWorkId);
            _reviewRepositoryMock.Setup(x => x.GetEmailOfReviewerByReviewIdAsync(reviewId)).ReturnsAsync(reviewerEmail);

            _userStoreMock.Reset();
            _userStoreMock.Setup(x => x.FindByIdAsync(userId.ToString(), CancellationToken.None)).ReturnsAsync(user);

            _emailSenderMock.Reset();

            var err = await Record.ExceptionAsync(async
                () => await _service.AddAnswerToReviewAsync(userId, reviewId, asnwerMsg));

            err.Should().BeNull();

            _scientificWorkRepositoryMock.Verify(x => x.IsAuthorOfScientificWorkByReviewIdAsync(userId, reviewId), Times.Once);
            _reviewRepositoryMock.Verify(x => x.GetReviewByIdAsync(reviewId), Times.Once);
            _reviewRepositoryMock.Verify(x => x.AddAnswerToReviewAsync(It.Is<Review>(y => y.Answer.User == user && y.Answer.Comment == asnwerMsg)), Times.Once);
            _reviewRepositoryMock.Verify(x => x.GetWorkIdByReviewIdAsync(reviewId), Times.Once);
            _reviewRepositoryMock.Verify(x => x.GetEmailOfReviewerByReviewIdAsync(reviewId), Times.Once);
            _emailSenderMock.Verify(x => x.SendReceiveAnswerEmailAsync(reviewerEmail, scientificWorkId), Times.Once);
        }

        [Fact]
        public async Task AddReviewAsyncUserIsNotReviewerOfWorkDoNothing()
        {
            var reviewerId = 1u;
            var reviewMsg = "This is my review!";
            var reviewFile = new FormFile(null, 42534, 2345, "NameHaHa", "FileNameHueHue");
            var rating = (byte)3;
            var scientificWorkId = 2u;

            _scientificWorkRepositoryMock.Reset();
            _scientificWorkRepositoryMock.Setup(x => x.IsReviewerOfScientificWorkAsync(reviewerId, scientificWorkId)).ReturnsAsync(false);

            _scientificWorkFileRepositoryMock.Reset();
            _userStoreMock.Reset();
            _fileManagerMock.Reset();
            _reviewRepositoryMock.Reset();
            _emailSenderMock.Reset();
            _reviewersWorkRepositoryMock.Reset();

            var err = await Record.ExceptionAsync(async
                () => await _service.AddReviewAsync(reviewerId, reviewMsg, reviewFile, rating, scientificWorkId));

            err.Should().BeNull();

            _scientificWorkRepositoryMock.Verify(x => x.IsReviewerOfScientificWorkAsync(reviewerId, scientificWorkId), Times.Once);
            _scientificWorkRepositoryMock.Verify(x => x.GetEmailOfAuthorByWorkIdAsync(It.IsAny<uint>()), Times.Never);
            _scientificWorkRepositoryMock.Verify(x => x.ChangeStatusAsync(It.IsAny<ScientificWork>()), Times.Never);
            _scientificWorkRepositoryMock.Verify(x => x.GetWorkByIdAsync(It.IsAny<uint>()), Times.Never);
            _scientificWorkFileRepositoryMock.Verify(x => x.GetNewestVersionWithReviewsAsync(It.IsAny<uint>()), Times.Never);
            _scientificWorkFileRepositoryMock.Verify(x => x.GetReviewsCountInNewestVersion(It.IsAny<uint>()), Times.Never);
            _scientificWorkFileRepositoryMock.Verify(x => x.GetRatingSumFromVersion(It.IsAny<uint>()), Times.Never);
            _scientificWorkFileRepositoryMock.Verify(x => x.AddRatingAsync(It.IsAny<ScientificWorkFile>()), Times.Never);
            _userStoreMock.Verify(x => x.FindByIdAsync(It.IsAny<string>(), CancellationToken.None), Times.Never);
            _fileManagerMock.Verify(x => x.SaveFileAsync(It.IsAny<IFormFile>()), Times.Never);
            _reviewRepositoryMock.Verify(x => x.AddReviewAsync(It.IsAny<Review>()), Times.Never);
            _reviewersWorkRepositoryMock.Verify(x => x.GetReviewersCount(It.IsAny<uint>()), Times.Never);
            _emailSenderMock.Verify(x => x.SendToAuthorWorkGotRejectedAsync(It.IsAny<string>(), It.IsAny<uint>()), Times.Never);
            _emailSenderMock.Verify(x => x.SendNewVersionEnabledEmailAsync(It.IsAny<string>(), It.IsAny<uint>()), Times.Never);
            _emailSenderMock.Verify(x => x.SendToAuthorWorkGotAcceptedAsync(It.IsAny<string>(), It.IsAny<uint>()), Times.Never);
            _emailSenderMock.Verify(x => x.SendReceiveReviewEmailAsync(It.IsAny<string>(), It.IsAny<uint>()), Times.Never);
        }

        [Fact]
        public async Task AddReviewAsyncWorkAlreadyHaveReviewFromThisUserDoNothing()
        {
            var reviewerId = 1u;
            var reviewMsg = "This is my review!";
            var reviewFile = new FormFile(null, 42534, 2345, "NameHaHa", "FileNameHueHue");
            var rating = (byte)3;
            var scientificWorkId = 2u;

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

            _scientificWorkRepositoryMock.Reset();
            _scientificWorkRepositoryMock.Setup(x => x.IsReviewerOfScientificWorkAsync(reviewerId, scientificWorkId)).ReturnsAsync(true);

            _scientificWorkFileRepositoryMock.Reset();
            _scientificWorkFileRepositoryMock.Setup(x => x.GetNewestVersionWithReviewsAsync(scientificWorkId)).ReturnsAsync(scientificWork);

            _userStoreMock.Reset();
            _fileManagerMock.Reset();
            _reviewRepositoryMock.Reset();
            _emailSenderMock.Reset();
            _reviewersWorkRepositoryMock.Reset();

            var err = await Record.ExceptionAsync(async
                () => await _service.AddReviewAsync(reviewerId, reviewMsg, reviewFile, rating, scientificWorkId));

            err.Should().BeNull();

            _scientificWorkRepositoryMock.Verify(x => x.IsReviewerOfScientificWorkAsync(reviewerId, scientificWorkId), Times.Once);
            _scientificWorkRepositoryMock.Verify(x => x.GetEmailOfAuthorByWorkIdAsync(It.IsAny<uint>()), Times.Never);
            _scientificWorkRepositoryMock.Verify(x => x.ChangeStatusAsync(It.IsAny<ScientificWork>()), Times.Never);
            _scientificWorkRepositoryMock.Verify(x => x.GetWorkByIdAsync(It.IsAny<uint>()), Times.Never);

            _scientificWorkFileRepositoryMock.Verify(x => x.GetNewestVersionWithReviewsAsync(scientificWorkId), Times.Once);
            _scientificWorkFileRepositoryMock.Verify(x => x.GetReviewsCountInNewestVersion(It.IsAny<uint>()), Times.Never);
            _scientificWorkFileRepositoryMock.Verify(x => x.GetRatingSumFromVersion(It.IsAny<uint>()), Times.Never);
            _scientificWorkFileRepositoryMock.Verify(x => x.AddRatingAsync(It.IsAny<ScientificWorkFile>()), Times.Never);

            _userStoreMock.Verify(x => x.FindByIdAsync(It.IsAny<string>(), CancellationToken.None), Times.Never);

            _fileManagerMock.Verify(x => x.SaveFileAsync(It.IsAny<IFormFile>()), Times.Never);

            _reviewRepositoryMock.Verify(x => x.AddReviewAsync(It.IsAny<Review>()), Times.Never);

            _reviewersWorkRepositoryMock.Verify(x => x.GetReviewersCount(It.IsAny<uint>()), Times.Never);

            _emailSenderMock.Verify(x => x.SendToAuthorWorkGotRejectedAsync(It.IsAny<string>(), It.IsAny<uint>()), Times.Never);
            _emailSenderMock.Verify(x => x.SendNewVersionEnabledEmailAsync(It.IsAny<string>(), It.IsAny<uint>()), Times.Never);
            _emailSenderMock.Verify(x => x.SendToAuthorWorkGotAcceptedAsync(It.IsAny<string>(), It.IsAny<uint>()), Times.Never);
            _emailSenderMock.Verify(x => x.SendReceiveReviewEmailAsync(It.IsAny<string>(), It.IsAny<uint>()), Times.Never);
        }

        [Fact]
        public async Task AddReviewAsyncAddNotLastInVersionReviewOnlyAddReviewToDb()
        {
            var reviewerId = 1u;
            var reviewMsg = "This is my review!";
            var reviewFile = new FormFile(null, 42534, 2345, "NameHaHa", "FileNameHueHue");
            var rating = (byte)3;
            var scientificWorkId = 2u;

            var version = new ScientificWorkFile()
            {
                Reviews = new List<Review>()
            };

            var reviewer = new User() { Id = reviewerId };

            var randomFileName = "afertgh35he.png";

            var reviewerCount = 3;
            var reviewsCount = 1;

            var authorEmail = "author@mail.com";

            _scientificWorkRepositoryMock.Reset();
            _scientificWorkRepositoryMock.Setup(x => x.IsReviewerOfScientificWorkAsync(reviewerId, scientificWorkId)).ReturnsAsync(true);
            _scientificWorkRepositoryMock.Setup(x => x.GetEmailOfAuthorByWorkIdAsync(scientificWorkId)).ReturnsAsync(authorEmail);

            _scientificWorkFileRepositoryMock.Reset();
            _scientificWorkFileRepositoryMock.Setup(x => x.GetNewestVersionWithReviewsAsync(scientificWorkId)).ReturnsAsync(version);
            _scientificWorkFileRepositoryMock.Setup(x => x.GetReviewsCountInNewestVersion(scientificWorkId)).Returns(reviewsCount);

            _userStoreMock.Reset();
            _userStoreMock.Setup(x => x.FindByIdAsync(reviewerId.ToString(), CancellationToken.None)).ReturnsAsync(reviewer);

            _fileManagerMock.Reset();
            _fileManagerMock.Setup(x => x.SaveFileAsync(reviewFile)).ReturnsAsync(randomFileName);

            _reviewRepositoryMock.Reset();
            _reviewRepositoryMock.Setup(x => x.AddReviewAsync(It.Is<Review>(y => y.Reviewer == reviewer &&
                                                                                 y.Rating == rating && y.File == randomFileName &&
                                                                                 y.VersionOfScientificWork == version)));

            _reviewersWorkRepositoryMock.Reset();
            _reviewersWorkRepositoryMock.Setup(x => x.GetReviewersCount(scientificWorkId)).Returns(reviewerCount);

            _emailSenderMock.Reset();
            _emailSenderMock.Setup(x => x.SendReceiveReviewEmailAsync(authorEmail, scientificWorkId));

            var err = await Record.ExceptionAsync(async
                () => await _service.AddReviewAsync(reviewerId, reviewMsg, reviewFile, rating, scientificWorkId));

            err.Should().BeNull();

            _scientificWorkRepositoryMock.Verify(x => x.IsReviewerOfScientificWorkAsync(reviewerId, scientificWorkId), Times.Once);
            _scientificWorkRepositoryMock.Verify(x => x.GetEmailOfAuthorByWorkIdAsync(scientificWorkId), Times.Once);
            _scientificWorkRepositoryMock.Verify(x => x.ChangeStatusAsync(It.IsAny<ScientificWork>()), Times.Never);
            _scientificWorkRepositoryMock.Verify(x => x.GetWorkByIdAsync(It.IsAny<uint>()), Times.Never);

            _scientificWorkFileRepositoryMock.Verify(x => x.GetNewestVersionWithReviewsAsync(scientificWorkId), Times.Once);
            _scientificWorkFileRepositoryMock.Verify(x => x.GetReviewsCountInNewestVersion(scientificWorkId), Times.Once);
            _scientificWorkFileRepositoryMock.Verify(x => x.GetRatingSumFromVersion(It.IsAny<uint>()), Times.Never);
            _scientificWorkFileRepositoryMock.Verify(x => x.AddRatingAsync(It.IsAny<ScientificWorkFile>()), Times.Never);

            _userStoreMock.Verify(x => x.FindByIdAsync(reviewerId.ToString(), CancellationToken.None), Times.Once);

            _fileManagerMock.Verify(x => x.SaveFileAsync(reviewFile), Times.Once);

            _reviewRepositoryMock.Verify(x => x.AddReviewAsync(It.Is<Review>(y => y.Reviewer == reviewer &&
                                                                             y.Rating == rating && y.File == randomFileName &&
                                                                             y.VersionOfScientificWork == version)), Times.Once);

            _reviewersWorkRepositoryMock.Verify(x => x.GetReviewersCount(scientificWorkId), Times.Once);

            _emailSenderMock.Verify(x => x.SendToAuthorWorkGotRejectedAsync(It.IsAny<string>(), It.IsAny<uint>()), Times.Never);
            _emailSenderMock.Verify(x => x.SendNewVersionEnabledEmailAsync(It.IsAny<string>(), It.IsAny<uint>()), Times.Never);
            _emailSenderMock.Verify(x => x.SendToAuthorWorkGotAcceptedAsync(It.IsAny<string>(), It.IsAny<uint>()), Times.Never);
            _emailSenderMock.Verify(x => x.SendReceiveReviewEmailAsync(authorEmail, scientificWorkId), Times.Once);
        }

        [Fact]
        public async Task AddReviewAsyncAllReviewersAddedReviewSetRejectedStatus()
        {
            var reviewerId = 1u;
            var reviewMsg = "This is my review!";
            var reviewFile = new FormFile(null, 42534, 2345, "NameHaHa", "FileNameHueHue");
            var rating = (byte)3;
            var scientificWorkId = 2u;

            var version = new ScientificWorkFile()
            {
                Id = 3,
                Reviews = new List<Review>()
            };

            var reviewer = new User() { Id = reviewerId };

            var randomFileName = "afertgh35he.png";

            var reviewerCount = 3;
            var reviewsCount = 3;

            var authorEmail = "author@mail.com";

            var ratingSum = 4;

            var scientificWork = new ScientificWork() { Status = StatusEnum.UnderReview };

            _scientificWorkRepositoryMock.Reset();
            _scientificWorkRepositoryMock.Setup(x => x.IsReviewerOfScientificWorkAsync(reviewerId, scientificWorkId)).ReturnsAsync(true);
            _scientificWorkRepositoryMock.Setup(x => x.GetEmailOfAuthorByWorkIdAsync(scientificWorkId)).ReturnsAsync(authorEmail);
            _scientificWorkRepositoryMock.Setup(x => x.GetWorkByIdAsync(scientificWorkId)).ReturnsAsync(scientificWork);
            _scientificWorkRepositoryMock.Setup(x => x.ChangeStatusAsync(It.Is<ScientificWork>(y => y.Status == StatusEnum.Rejected)));

            _scientificWorkFileRepositoryMock.Reset();
            _scientificWorkFileRepositoryMock.Setup(x => x.GetNewestVersionWithReviewsAsync(scientificWorkId)).ReturnsAsync(version);
            _scientificWorkFileRepositoryMock.Setup(x => x.GetReviewsCountInNewestVersion(scientificWorkId)).Returns(reviewsCount);
            _scientificWorkFileRepositoryMock.Setup(x => x.GetRatingSumFromVersion(version.Id)).ReturnsAsync(ratingSum);
            _scientificWorkFileRepositoryMock.Setup(x => x.AddRatingAsync(It.Is<ScientificWorkFile>(y => y.Rating == 1)));

            _userStoreMock.Reset();
            _userStoreMock.Setup(x => x.FindByIdAsync(reviewerId.ToString(), CancellationToken.None)).ReturnsAsync(reviewer);

            _fileManagerMock.Reset();
            _fileManagerMock.Setup(x => x.SaveFileAsync(reviewFile)).ReturnsAsync(randomFileName);

            _reviewRepositoryMock.Reset();
            _reviewRepositoryMock.Setup(x => x.AddReviewAsync(It.Is<Review>(y => y.Reviewer == reviewer &&
                                                                                 y.Rating == rating && y.File == randomFileName &&
                                                                                 y.VersionOfScientificWork == version)));

            _reviewersWorkRepositoryMock.Reset();
            _reviewersWorkRepositoryMock.Setup(x => x.GetReviewersCount(scientificWorkId)).Returns(reviewerCount);

            _emailSenderMock.Reset();
            _emailSenderMock.Setup(x => x.SendToAuthorWorkGotRejectedAsync(authorEmail, scientificWorkId));

            var err = await Record.ExceptionAsync(async
                () => await _service.AddReviewAsync(reviewerId, reviewMsg, reviewFile, rating, scientificWorkId));

            err.Should().BeNull();

            _scientificWorkRepositoryMock.Verify(x => x.IsReviewerOfScientificWorkAsync(reviewerId, scientificWorkId), Times.Once);
            _scientificWorkRepositoryMock.Verify(x => x.GetEmailOfAuthorByWorkIdAsync(scientificWorkId), Times.Once);
            _scientificWorkRepositoryMock.Verify(x => x.GetWorkByIdAsync(scientificWorkId), Times.Once);
            _scientificWorkRepositoryMock.Verify(x => x.ChangeStatusAsync(It.Is<ScientificWork>(y => y.Status == StatusEnum.Rejected)), Times.Once);

            _scientificWorkFileRepositoryMock.Verify(x => x.GetNewestVersionWithReviewsAsync(scientificWorkId), Times.Once);
            _scientificWorkFileRepositoryMock.Verify(x => x.GetReviewsCountInNewestVersion(scientificWorkId), Times.Once);
            _scientificWorkFileRepositoryMock.Verify(x => x.GetRatingSumFromVersion(version.Id), Times.Once);
            _scientificWorkFileRepositoryMock.Verify(x => x.AddRatingAsync(It.Is<ScientificWorkFile>(y => y.Rating == 1)), Times.Once);

            _userStoreMock.Verify(x => x.FindByIdAsync(reviewerId.ToString(), CancellationToken.None), Times.Once);

            _fileManagerMock.Verify(x => x.SaveFileAsync(reviewFile), Times.Once);

            _reviewRepositoryMock.Verify(x => x.AddReviewAsync(It.Is<Review>(y => y.Reviewer == reviewer &&
                                                                             y.Rating == rating && y.File == randomFileName &&
                                                                             y.VersionOfScientificWork == version)), Times.Once);

            _reviewersWorkRepositoryMock.Verify(x => x.GetReviewersCount(scientificWorkId), Times.Once);

            _emailSenderMock.Verify(x => x.SendToAuthorWorkGotRejectedAsync(authorEmail, scientificWorkId), Times.Once);
            _emailSenderMock.Verify(x => x.SendNewVersionEnabledEmailAsync(It.IsAny<string>(), It.IsAny<uint>()), Times.Never);
            _emailSenderMock.Verify(x => x.SendToAuthorWorkGotAcceptedAsync(It.IsAny<string>(), It.IsAny<uint>()), Times.Never);
            _emailSenderMock.Verify(x => x.SendReceiveReviewEmailAsync(It.IsAny<string>(), It.IsAny<uint>()), Times.Never);
        }

        [Fact]
        public async Task AddReviewAsyncAllReviewersAddedReviewSetCorrectingStatus()
        {
            var reviewerId = 1u;
            var reviewMsg = "This is my review!";
            var reviewFile = new FormFile(null, 42534, 2345, "NameHaHa", "FileNameHueHue");
            var rating = (byte)3;
            var scientificWorkId = 2u;

            var version = new ScientificWorkFile()
            {
                Id = 3,
                Reviews = new List<Review>()
            };

            var reviewer = new User() { Id = reviewerId };

            var randomFileName = "afertgh35he.png";

            var reviewerCount = 3;
            var reviewsCount = 3;

            var authorEmail = "author@mail.com";

            var ratingSum = 6;

            var scientificWork = new ScientificWork() { Status = StatusEnum.UnderReview };

            _scientificWorkRepositoryMock.Reset();
            _scientificWorkRepositoryMock.Setup(x => x.IsReviewerOfScientificWorkAsync(reviewerId, scientificWorkId)).ReturnsAsync(true);
            _scientificWorkRepositoryMock.Setup(x => x.GetEmailOfAuthorByWorkIdAsync(scientificWorkId)).ReturnsAsync(authorEmail);
            _scientificWorkRepositoryMock.Setup(x => x.GetWorkByIdAsync(scientificWorkId)).ReturnsAsync(scientificWork);
            _scientificWorkRepositoryMock.Setup(x => x.ChangeStatusAsync(It.Is<ScientificWork>(y => y.Status == StatusEnum.Correcting)));

            _scientificWorkFileRepositoryMock.Reset();
            _scientificWorkFileRepositoryMock.Setup(x => x.GetNewestVersionWithReviewsAsync(scientificWorkId)).ReturnsAsync(version);
            _scientificWorkFileRepositoryMock.Setup(x => x.GetReviewsCountInNewestVersion(scientificWorkId)).Returns(reviewsCount);
            _scientificWorkFileRepositoryMock.Setup(x => x.GetRatingSumFromVersion(version.Id)).ReturnsAsync(ratingSum);
            _scientificWorkFileRepositoryMock.Setup(x => x.AddRatingAsync(It.Is<ScientificWorkFile>(y => y.Rating == 2)));

            _userStoreMock.Reset();
            _userStoreMock.Setup(x => x.FindByIdAsync(reviewerId.ToString(), CancellationToken.None)).ReturnsAsync(reviewer);

            _fileManagerMock.Reset();
            _fileManagerMock.Setup(x => x.SaveFileAsync(reviewFile)).ReturnsAsync(randomFileName);

            _reviewRepositoryMock.Reset();
            _reviewRepositoryMock.Setup(x => x.AddReviewAsync(It.Is<Review>(y => y.Reviewer == reviewer &&
                                                                                 y.Rating == rating && y.File == randomFileName &&
                                                                                 y.VersionOfScientificWork == version)));

            _reviewersWorkRepositoryMock.Reset();
            _reviewersWorkRepositoryMock.Setup(x => x.GetReviewersCount(scientificWorkId)).Returns(reviewerCount);

            _emailSenderMock.Reset();
            _emailSenderMock.Setup(x => x.SendNewVersionEnabledEmailAsync(authorEmail, scientificWorkId));

            var err = await Record.ExceptionAsync(async
                () => await _service.AddReviewAsync(reviewerId, reviewMsg, reviewFile, rating, scientificWorkId));

            err.Should().BeNull();

            _scientificWorkRepositoryMock.Verify(x => x.IsReviewerOfScientificWorkAsync(reviewerId, scientificWorkId), Times.Once);
            _scientificWorkRepositoryMock.Verify(x => x.GetEmailOfAuthorByWorkIdAsync(scientificWorkId), Times.Once);
            _scientificWorkRepositoryMock.Verify(x => x.GetWorkByIdAsync(scientificWorkId), Times.Once);
            _scientificWorkRepositoryMock.Verify(x => x.ChangeStatusAsync(It.Is<ScientificWork>(y => y.Status == StatusEnum.Correcting)), Times.Once);

            _scientificWorkFileRepositoryMock.Verify(x => x.GetNewestVersionWithReviewsAsync(scientificWorkId), Times.Once);
            _scientificWorkFileRepositoryMock.Verify(x => x.GetReviewsCountInNewestVersion(scientificWorkId), Times.Once);
            _scientificWorkFileRepositoryMock.Verify(x => x.GetRatingSumFromVersion(version.Id), Times.Once);
            _scientificWorkFileRepositoryMock.Verify(x => x.AddRatingAsync(It.Is<ScientificWorkFile>(y => y.Rating == 2)), Times.Once);

            _userStoreMock.Verify(x => x.FindByIdAsync(reviewerId.ToString(), CancellationToken.None), Times.Once);

            _fileManagerMock.Verify(x => x.SaveFileAsync(reviewFile), Times.Once);

            _reviewRepositoryMock.Verify(x => x.AddReviewAsync(It.Is<Review>(y => y.Reviewer == reviewer &&
                                                                             y.Rating == rating && y.File == randomFileName &&
                                                                             y.VersionOfScientificWork == version)), Times.Once);

            _reviewersWorkRepositoryMock.Verify(x => x.GetReviewersCount(scientificWorkId), Times.Once);

            _emailSenderMock.Verify(x => x.SendToAuthorWorkGotRejectedAsync(It.IsAny<string>(), It.IsAny<uint>()), Times.Never);
            _emailSenderMock.Verify(x => x.SendNewVersionEnabledEmailAsync(authorEmail, scientificWorkId), Times.Once);
            _emailSenderMock.Verify(x => x.SendToAuthorWorkGotAcceptedAsync(It.IsAny<string>(), It.IsAny<uint>()), Times.Never);
            _emailSenderMock.Verify(x => x.SendReceiveReviewEmailAsync(It.IsAny<string>(), It.IsAny<uint>()), Times.Never);
        }

        [Fact]
        public async Task AddReviewAsyncAllReviewersAddedReviewSetAcceptedStatus()
        {
            var reviewerId = 1u;
            var reviewMsg = "This is my review!";
            var reviewFile = new FormFile(null, 42534, 2345, "NameHaHa", "FileNameHueHue");
            var rating = (byte)3;
            var scientificWorkId = 2u;

            var version = new ScientificWorkFile()
            {
                Id = 3,
                Reviews = new List<Review>()
            };

            var reviewer = new User() { Id = reviewerId };

            var randomFileName = "afertgh35he.png";

            var reviewerCount = 3;
            var reviewsCount = 3;

            var authorEmail = "author@mail.com";

            var ratingSum = 9;

            var scientificWork = new ScientificWork() { Status = StatusEnum.UnderReview };

            _scientificWorkRepositoryMock.Reset();
            _scientificWorkRepositoryMock.Setup(x => x.IsReviewerOfScientificWorkAsync(reviewerId, scientificWorkId)).ReturnsAsync(true);
            _scientificWorkRepositoryMock.Setup(x => x.GetEmailOfAuthorByWorkIdAsync(scientificWorkId)).ReturnsAsync(authorEmail);
            _scientificWorkRepositoryMock.Setup(x => x.GetWorkByIdAsync(scientificWorkId)).ReturnsAsync(scientificWork);
            _scientificWorkRepositoryMock.Setup(x => x.ChangeStatusAsync(It.Is<ScientificWork>(y => y.Status == StatusEnum.Accepted)));

            _scientificWorkFileRepositoryMock.Reset();
            _scientificWorkFileRepositoryMock.Setup(x => x.GetNewestVersionWithReviewsAsync(scientificWorkId)).ReturnsAsync(version);
            _scientificWorkFileRepositoryMock.Setup(x => x.GetReviewsCountInNewestVersion(scientificWorkId)).Returns(reviewsCount);
            _scientificWorkFileRepositoryMock.Setup(x => x.GetRatingSumFromVersion(version.Id)).ReturnsAsync(ratingSum);
            _scientificWorkFileRepositoryMock.Setup(x => x.AddRatingAsync(It.Is<ScientificWorkFile>(y => y.Rating == 3)));

            _userStoreMock.Reset();
            _userStoreMock.Setup(x => x.FindByIdAsync(reviewerId.ToString(), CancellationToken.None)).ReturnsAsync(reviewer);

            _fileManagerMock.Reset();
            _fileManagerMock.Setup(x => x.SaveFileAsync(reviewFile)).ReturnsAsync(randomFileName);

            _reviewRepositoryMock.Reset();
            _reviewRepositoryMock.Setup(x => x.AddReviewAsync(It.Is<Review>(y => y.Reviewer == reviewer &&
                                                                                 y.Rating == rating && y.File == randomFileName &&
                                                                                 y.VersionOfScientificWork == version)));

            _reviewersWorkRepositoryMock.Reset();
            _reviewersWorkRepositoryMock.Setup(x => x.GetReviewersCount(scientificWorkId)).Returns(reviewerCount);

            _emailSenderMock.Reset();
            _emailSenderMock.Setup(x => x.SendToAuthorWorkGotAcceptedAsync(authorEmail, scientificWorkId));

            var err = await Record.ExceptionAsync(async
                () => await _service.AddReviewAsync(reviewerId, reviewMsg, reviewFile, rating, scientificWorkId));

            err.Should().BeNull();

            _scientificWorkRepositoryMock.Verify(x => x.IsReviewerOfScientificWorkAsync(reviewerId, scientificWorkId), Times.Once);
            _scientificWorkRepositoryMock.Verify(x => x.GetEmailOfAuthorByWorkIdAsync(scientificWorkId), Times.Once);
            _scientificWorkRepositoryMock.Verify(x => x.GetWorkByIdAsync(scientificWorkId), Times.Once);
            _scientificWorkRepositoryMock.Verify(x => x.ChangeStatusAsync(It.Is<ScientificWork>(y => y.Status == StatusEnum.Accepted)), Times.Once);

            _scientificWorkFileRepositoryMock.Verify(x => x.GetNewestVersionWithReviewsAsync(scientificWorkId), Times.Once);
            _scientificWorkFileRepositoryMock.Verify(x => x.GetReviewsCountInNewestVersion(scientificWorkId), Times.Once);
            _scientificWorkFileRepositoryMock.Verify(x => x.GetRatingSumFromVersion(version.Id), Times.Once);
            _scientificWorkFileRepositoryMock.Verify(x => x.AddRatingAsync(It.Is<ScientificWorkFile>(y => y.Rating == 3)), Times.Once);

            _userStoreMock.Verify(x => x.FindByIdAsync(reviewerId.ToString(), CancellationToken.None), Times.Once);

            _fileManagerMock.Verify(x => x.SaveFileAsync(reviewFile), Times.Once);

            _reviewRepositoryMock.Verify(x => x.AddReviewAsync(It.Is<Review>(y => y.Reviewer == reviewer &&
                                                                             y.Rating == rating && y.File == randomFileName &&
                                                                             y.VersionOfScientificWork == version)), Times.Once);

            _reviewersWorkRepositoryMock.Verify(x => x.GetReviewersCount(scientificWorkId), Times.Once);

            _emailSenderMock.Verify(x => x.SendToAuthorWorkGotRejectedAsync(It.IsAny<string>(), It.IsAny<uint>()), Times.Never);
            _emailSenderMock.Verify(x => x.SendNewVersionEnabledEmailAsync(It.IsAny<string>(), It.IsAny<uint>()), Times.Never);
            _emailSenderMock.Verify(x => x.SendToAuthorWorkGotAcceptedAsync(authorEmail, scientificWorkId), Times.Once);
            _emailSenderMock.Verify(x => x.SendReceiveReviewEmailAsync(It.IsAny<string>(), It.IsAny<uint>()), Times.Never);
        }

        [Fact]
        public async Task GetStreamOfReviewFileAsyncUserIsParticipantReturnNull()
        {
            var userId = 1u;
            var reviewId = 2u;

            Stream returnedStream = null;

            _scientificWorkRepositoryMock.Reset();
            _scientificWorkRepositoryMock.Setup(x => x.IsAuthorOfScientificWorkByReviewIdAsync(userId, reviewId)).ReturnsAsync(false);

            _reviewRepositoryMock.Reset();
            _reviewRepositoryMock.Setup(x => x.IsAuthorOfReview(userId, reviewId)).ReturnsAsync(false);

            _fileManagerMock.Reset();

            var err = await Record.ExceptionAsync(async
                () => returnedStream = await _service.GetStreamOfReviewFileAsync(userId, reviewId));

            err.Should().BeNull();

            returnedStream.Should().BeNull();

            _scientificWorkRepositoryMock.Verify(x => x.IsAuthorOfScientificWorkByReviewIdAsync(userId, reviewId), Times.Once);
            _reviewRepositoryMock.Verify(x => x.IsAuthorOfReview(userId, reviewId), Times.Once);
            _reviewRepositoryMock.Verify(x => x.GetReviewByIdAsync(It.IsAny<uint>()), Times.Never);
            _fileManagerMock.Verify(x => x.GetStreamOfFile(It.IsAny<string>()), Times.Never);
        }

        [Fact]
        public async Task GetStreamOfReviewFileAsyncUserIsAuthorReturnStream()
        {
            var userId = 1u;
            var reviewId = 2u;

            var review = new Review()
            {
                File = "agsertn2345l.png"
            };

            var streamOfFile = new MemoryStream(Encoding.UTF8.GetBytes("whatever"));

            Stream returnedStream = null;

            _scientificWorkRepositoryMock.Reset();
            _scientificWorkRepositoryMock.Setup(x => x.IsAuthorOfScientificWorkByReviewIdAsync(userId, reviewId)).ReturnsAsync(true);

            _reviewRepositoryMock.Reset();
            _reviewRepositoryMock.Setup(x => x.GetReviewByIdAsync(reviewId)).ReturnsAsync(review);

            _fileManagerMock.Reset();
            _fileManagerMock.Setup(x => x.GetStreamOfFile(review.File)).Returns(streamOfFile);


            var err = await Record.ExceptionAsync(async
                () => returnedStream = await _service.GetStreamOfReviewFileAsync(userId, reviewId));

            err.Should().BeNull();

            returnedStream.Should().BeEquivalentTo(streamOfFile);

            _scientificWorkRepositoryMock.Verify(x => x.IsAuthorOfScientificWorkByReviewIdAsync(userId, reviewId), Times.Once);
            _reviewRepositoryMock.Verify(x => x.IsAuthorOfReview(It.IsAny<uint>(), It.IsAny<uint>()), Times.Never);
            _reviewRepositoryMock.Verify(x => x.GetReviewByIdAsync(reviewId), Times.Once);
            _fileManagerMock.Verify(x => x.GetStreamOfFile(review.File), Times.Once);
        }
        
        [Fact]
        public async Task GetStreamOfReviewFileAsyncUserIsReviewerReturnStream()
        {
            var userId = 1u;
            var reviewId = 2u;

            var review = new Review()
            {
                File = "agsertn2345l.png"
            };

            var streamOfFile = new MemoryStream(Encoding.UTF8.GetBytes("whatever"));

            Stream returnedStream = null;

            _scientificWorkRepositoryMock.Reset();
            _scientificWorkRepositoryMock.Setup(x => x.IsAuthorOfScientificWorkByReviewIdAsync(userId, reviewId)).ReturnsAsync(false);

            _reviewRepositoryMock.Reset();
            _reviewRepositoryMock.Setup(x => x.IsAuthorOfReview(userId, reviewId)).ReturnsAsync(true);
            _reviewRepositoryMock.Setup(x => x.GetReviewByIdAsync(reviewId)).ReturnsAsync(review);

            _fileManagerMock.Reset();
            _fileManagerMock.Setup(x => x.GetStreamOfFile(review.File)).Returns(streamOfFile);
            
            var err = await Record.ExceptionAsync(async
                () => returnedStream = await _service.GetStreamOfReviewFileAsync(userId, reviewId));

            err.Should().BeNull();

            returnedStream.Should().BeEquivalentTo(streamOfFile);

            _scientificWorkRepositoryMock.Verify(x => x.IsAuthorOfScientificWorkByReviewIdAsync(userId, reviewId), Times.Once);
            _reviewRepositoryMock.Verify(x => x.IsAuthorOfReview(userId, reviewId), Times.Once);
            _reviewRepositoryMock.Verify(x => x.GetReviewByIdAsync(reviewId), Times.Once);
            _fileManagerMock.Verify(x => x.GetStreamOfFile(review.File), Times.Once);
        }

        [Fact]
        public async Task GetStreamOfReviewFileAsyncReturnNullWhenFileDoesNotExists()
        {
            var userId = 1u;
            var reviewId = 2u;

            var review = new Review()
            {
                File = null
            };

            Stream returnedStream = null;

            _scientificWorkRepositoryMock.Reset();
            _scientificWorkRepositoryMock.Setup(x => x.IsAuthorOfScientificWorkByReviewIdAsync(userId, reviewId)).ReturnsAsync(true);

            _reviewRepositoryMock.Reset();
            _reviewRepositoryMock.Setup(x => x.GetReviewByIdAsync(reviewId)).ReturnsAsync(review);

            _fileManagerMock.Reset();
            _fileManagerMock.Setup(x => x.GetStreamOfFile(review.File));
            
            var err = await Record.ExceptionAsync(async
                () => returnedStream = await _service.GetStreamOfReviewFileAsync(userId, reviewId));

            err.Should().BeNull();

            returnedStream.Should().BeNull();

            _scientificWorkRepositoryMock.Verify(x => x.IsAuthorOfScientificWorkByReviewIdAsync(userId, reviewId), Times.Once);
            _reviewRepositoryMock.Verify(x => x.IsAuthorOfReview(It.IsAny<uint>(), It.IsAny<uint>()), Times.Never);
            _reviewRepositoryMock.Verify(x => x.GetReviewByIdAsync(reviewId), Times.Once);
            _fileManagerMock.Verify(x => x.GetStreamOfFile(It.IsAny<string>()), Times.Never);
        }
    }
}

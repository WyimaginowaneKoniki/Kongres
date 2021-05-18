using Bogus;
using FluentAssertions;
using Kongres.Api.Application.Services;
using Kongres.Api.Application.Services.Interfaces;
using Kongres.Api.Domain.Entities;
using Kongres.Api.Domain.Enums;
using Kongres.Api.Infrastructure.Repositories.Interfaces;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Xunit;

namespace Kongres.Api.Tests.Unit.Services
{
    public class ManagmentServiceTests : IDisposable
    {
        private readonly Mock<IScientificWorkRepository> _scientificWorkRepositoryMock = new Mock<IScientificWorkRepository>();
        private readonly Mock<IReviewerScientificWorkRepository> _reviewersScientificWorkRepositoryMock = new Mock<IReviewerScientificWorkRepository>();
        private readonly Mock<IUserRepository> _userRepositoryMock = new Mock<IUserRepository>();
        private readonly Mock<IEmailSender> _emailSenderMock = new Mock<IEmailSender>();
        private readonly IManagementService _managementService;
        private readonly Faker _faker = new Faker();

        public ManagmentServiceTests()
        {
            _managementService = new ManagementService(_scientificWorkRepositoryMock.Object,
                                                       _reviewersScientificWorkRepositoryMock.Object,
                                                       _userRepositoryMock.Object,
                                                       _emailSenderMock.Object);
        }

        public void Dispose()
        {
            _scientificWorkRepositoryMock.Reset();
            _reviewersScientificWorkRepositoryMock.Reset();
            _userRepositoryMock.Reset();
            _emailSenderMock.Reset();
        }

        [Theory]
        [InlineData(0)]
        [InlineData(1)]
        [InlineData(2)]
        [InlineData(3)]
        public async Task AssignReviewersToScientificWorkAsyncWhenThereIsNotEnoughReviewersInCategorySendEmailAndSetStatusToRejected(int reviewersCount)
        {
            var scientificWorksCount = 7;
            var category = "Biology";

            var userId = 1u;
            var scientificWorkId = 1u;

            var fakeUser = new Faker<User>().Rules((f, o) =>
            {
                o.Id = userId++;
                o.Email = f.Internet.Email();
                o.NormalizedEmail = o.Email.ToUpper();
            });

            var scientificWorks = new Faker<ScientificWork>().Rules((f, o) =>
            {
                o.Id = scientificWorkId++;
                o.MainAuthor = fakeUser.Generate();
            }).Generate(scientificWorksCount);

            var reviewers = fakeUser.Generate(reviewersCount);

            _scientificWorkRepositoryMock.Setup(x => x.GetAllBySpecializationAsync(category)).ReturnsAsync(scientificWorks);
            _scientificWorkRepositoryMock.Setup(x => x.ChangeStatusAsync(It.Is<ScientificWork>(x => x.Status == StatusEnum.Rejected)));

            _userRepositoryMock.Setup(x => x.GetAllBySpecializationAsync(category)).ReturnsAsync(reviewers);
            _userRepositoryMock.Setup(x => x.GetEmailById(It.IsIn(reviewers.Select(x => x.Id)))).Returns((uint x) => reviewers.Single(y => y.Id == x).Email);
            _userRepositoryMock.Setup(x => x.GetEmailById(It.IsIn(scientificWorks.Select(x => x.Id)))).Returns((uint x) => scientificWorks.Single(y => y.MainAuthor.Id == x).MainAuthor.Email);

            _emailSenderMock.Setup(x => x.SendDoNotGetAssignToAnyWork(It.IsAny<string>()));
            _emailSenderMock.Setup(x => x.SendWorkDidNotGetReviewers(It.IsAny<string>()));

            var err = await Record.ExceptionAsync(async
                () => await _managementService.AssignReviewersToScientificWorkAsync());

            err.Should().BeNull();

            _emailSenderMock.Verify(x => x.SendDoNotGetAssignToAnyWork(It.IsIn(reviewers.Select(x => x.Email))), Times.Exactly(reviewersCount));
            _emailSenderMock.Verify(x => x.SendWorkDidNotGetReviewers(It.IsIn(scientificWorks.Select(x => x.MainAuthor.Email))), Times.Exactly(scientificWorksCount));
            _emailSenderMock.VerifyNoOtherCalls();

            _scientificWorkRepositoryMock.Verify(x => x.ChangeStatusAsync(It.Is<ScientificWork>(x => x.Status == StatusEnum.Rejected)), Times.Exactly(scientificWorksCount));
        }

        [Theory]
        [InlineData(0)]
        [InlineData(1)]
        [InlineData(2)]
        [InlineData(3)]
        public async Task AssignReviewersToScientificWorkAsyncWhenThereIsNotEnoughScientificWorksInCategorySendEmailAndSetStatusToRejected(int scientificWorksCount)
        {
            var reviewersCount = 7;
            var category = "Biology";

            var userId = 1u;
            var scientificWorkId = 1u;

            var fakeUser = new Faker<User>().Rules((f, o) =>
            {
                o.Id = userId++;
                o.Email = f.Internet.Email();
                o.NormalizedEmail = o.Email.ToUpper();
            });

            var scientificWorks = new Faker<ScientificWork>().Rules((f, o) =>
            {
                o.Id = scientificWorkId++;
                o.MainAuthor = fakeUser.Generate();
            }).Generate(scientificWorksCount);

            var reviewers = fakeUser.Generate(reviewersCount);

            _scientificWorkRepositoryMock.Setup(x => x.GetAllBySpecializationAsync(category)).ReturnsAsync(scientificWorks);
            _scientificWorkRepositoryMock.Setup(x => x.ChangeStatusAsync(It.Is<ScientificWork>(x => x.Status == StatusEnum.Rejected)));

            _userRepositoryMock.Setup(x => x.GetAllBySpecializationAsync(category)).ReturnsAsync(reviewers);
            _userRepositoryMock.Setup(x => x.GetEmailById(It.IsIn(reviewers.Select(x => x.Id)))).Returns((uint x) => reviewers.Single(y => y.Id == x).Email);

            _emailSenderMock.Setup(x => x.SendDoNotGetAssignToAnyWork(It.IsAny<string>()));
            _emailSenderMock.Setup(x => x.SendWorkDidNotGetReviewers(It.IsAny<string>()));

            var err = await Record.ExceptionAsync(async
                () => await _managementService.AssignReviewersToScientificWorkAsync());

            err.Should().BeNull();

            _emailSenderMock.Verify(x => x.SendDoNotGetAssignToAnyWork(It.IsIn(reviewers.Select(x => x.Email))), Times.Exactly(reviewersCount));
            _emailSenderMock.Verify(x => x.SendWorkDidNotGetReviewers(It.IsIn(scientificWorks.Select(x => x.MainAuthor.Email))), Times.Exactly(scientificWorksCount));
            _emailSenderMock.VerifyNoOtherCalls();

            _scientificWorkRepositoryMock.Verify(x => x.ChangeStatusAsync(It.Is<ScientificWork>(x => x.Status == StatusEnum.Rejected)), Times.Exactly(scientificWorksCount));
        }

        [Theory]
        [InlineData(4, 4)]
        [InlineData(20, 4)]
        [InlineData(4, 20)]
        public async Task AssignReviewersToScientificWorkAsyncSuccess(int reviewersCount, int scientificWorksCount)
        {
            var category = "Biology";

            var userId = 1u;
            var scientificWorkId = 1u;

            var fakeUser = new Faker<User>().Rules((f, o) =>
            {
                o.Id = userId++;
                o.Email = _faker.Internet.Email();
                o.NormalizedEmail = o.Email.ToUpper();
            });

            var scientificWorks = new Faker<ScientificWork>().Rules((f, o) =>
            {
                o.Id = scientificWorkId++;
                o.MainAuthor = fakeUser.Generate();
            }).Generate(scientificWorksCount);

            var reviewers = fakeUser.Generate(reviewersCount);

            _scientificWorkRepositoryMock.Setup(x => x.GetAllBySpecializationAsync(category)).ReturnsAsync(scientificWorks);
            _scientificWorkRepositoryMock.Setup(x => x.ChangeStatusAsync(It.Is<ScientificWork>(x => x.Status == StatusEnum.UnderReview)));

            _userRepositoryMock.Setup(x => x.GetAllBySpecializationAsync(category)).ReturnsAsync(reviewers);
            _userRepositoryMock.Setup(x => x.GetEmailById(It.IsIn(reviewers.Select(x => x.Id)))).Returns((uint x) => reviewers.Single(y => y.Id == x).Email);

            _emailSenderMock.Setup(x => x.SendWorkAssignmentInformationAsync(It.IsAny<string>(), It.IsAny<uint>()));
            _emailSenderMock.Setup(x => x.SendReviewersAssignmentInformationAsync(It.IsAny<string>(), It.IsAny<uint>()));

            _reviewersScientificWorkRepositoryMock.Setup(x => x.AddAsync(It.IsAny<List<ReviewersScienceWork>>()));

            var err = await Record.ExceptionAsync(async
                () => await _managementService.AssignReviewersToScientificWorkAsync());

            err.Should().BeNull();

            _emailSenderMock.Verify(x => x.SendWorkAssignmentInformationAsync(It.IsIn(reviewers.Select(x => x.Email)), It.IsInRange(1u, (uint)scientificWorksCount, Moq.Range.Inclusive)), Times.AtLeast(3 * scientificWorksCount));
            _emailSenderMock.Verify(x => x.SendReviewersAssignmentInformationAsync(It.IsIn(scientificWorks.Select(x => x.MainAuthor.Email)), It.IsInRange(1u, (uint)scientificWorksCount, Moq.Range.Inclusive)), Times.Exactly(scientificWorksCount));
            _emailSenderMock.VerifyNoOtherCalls();

            _reviewersScientificWorkRepositoryMock.Verify(x => x.AddAsync(It.Is<List<ReviewersScienceWork>>(x => x.Count >= 3 * scientificWorksCount)), Times.Once);
        }

        [Fact]
        public async Task AssignReviewersToScientificWorkAsyncAuthorCannotBeReviewerOfOwnWork()
        {
            var scientificWorksCount = 4;
            var reviewersCCount = 4;
            var category = "Biology";

            var userId = 1u;

            var reviewers = new Faker<User>().Rules((f, o) =>
            {
                o.Id = userId++;
                o.Email = f.Internet.Email();
                o.NormalizedEmail = o.Email.ToUpper();
            }).Generate(reviewersCCount);

            var scientificWorks = Enumerable.Range(0, scientificWorksCount)
                                            .Select(x => new ScientificWork()
                                            {
                                                Id = (uint)(x + 1),
                                                MainAuthor = reviewers[x]
                                            });

            _scientificWorkRepositoryMock.Setup(x => x.GetAllBySpecializationAsync(category)).ReturnsAsync(scientificWorks);
            _scientificWorkRepositoryMock.Setup(x => x.ChangeStatusAsync(It.Is<ScientificWork>(x => x.Status == StatusEnum.UnderReview)));

            _userRepositoryMock.Setup(x => x.GetAllBySpecializationAsync(category)).ReturnsAsync(reviewers);

            _reviewersScientificWorkRepositoryMock.Setup(x => x.AddAsync(It.IsAny<List<ReviewersScienceWork>>()));

            var err = await Record.ExceptionAsync(async
                () => await _managementService.AssignReviewersToScientificWorkAsync());

            err.Should().BeNull();

            _reviewersScientificWorkRepositoryMock.Verify(x => x.AddAsync(It.Is<List<ReviewersScienceWork>>(x => x.Any(y => y.User.NormalizedEmail == y.ScientificWork.MainAuthor.NormalizedEmail))), Times.Never);
        }
    }
}

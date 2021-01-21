using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using FluentAssertions;
using Kongres.Api.Application.Services;
using Kongres.Api.Application.Services.Interfaces;
using Kongres.Api.Domain.Entities;
using Kongres.Api.Infrastructure.Repositories.Interfaces;
using Moq;
using Xunit;

namespace Kongres.Api.Tests.Unit.Services
{
    public class ManagementTestService
    {
        private readonly Mock<IScientificWorkRepository> _scientificWorkRepositoryMock;
        private readonly Mock<IReviewerRepository> _reviewerRepositoryMock;
        private readonly Mock<IReviewerScientificWorkRepository> _reviewersScientificWorkRepositoryMock;
        private readonly Mock<IUserRepository> _userRepositoryMock;
        private readonly Mock<IEmailSender> _emailSenderMock;

        private readonly IManagementService _service;

        public ManagementTestService()
        {
            _scientificWorkRepositoryMock = new Mock<IScientificWorkRepository>();
            _reviewerRepositoryMock = new Mock<IReviewerRepository>();
            _reviewersScientificWorkRepositoryMock = new Mock<IReviewerScientificWorkRepository>();
            _userRepositoryMock = new Mock<IUserRepository>();
            _emailSenderMock = new Mock<IEmailSender>();

            _service = new ManagementService(_scientificWorkRepositoryMock.Object,
                                            _reviewerRepositoryMock.Object,
                                            _reviewersScientificWorkRepositoryMock.Object,
                                            _userRepositoryMock.Object,
                                            _emailSenderMock.Object);
        }

        public async Task AssignReviewersToScientificWorkAsyncAssignReviewersToEveryWorkAllUsersUnique()
        {
            var categories = new[] { "Computer Science", "Mathematics", "Biology", "Chemistry", "Psychics", "Geography" };

            var scientificWorks = new List<ScientificWork>();
            var reviewers = new List<User>();

            var rnd = new Random();

            var scientificWorkId = 1u;
            var userId = 1u;

            foreach (var category in categories)
            {
                var scientificWorkCount = rnd.Next(4, 10);
                for (var i = 0; i < scientificWorkCount; i++)
                {
                    scientificWorks.Add(new ScientificWork()
                    {
                        Id = scientificWorkId++,
                        MainAuthor = new User()
                        {
                            Id = userId,
                            Email = $"{userId}@email.com"
                        }
                    });

                    userId++;
                }

                var reviewerCount = rnd.Next(scientificWorkCount, 15);
                for(var i = 0; i < reviewerCount; i++)
                {
                    reviewers.Add(new User(){Id = userId++});
                }
            }

            _scientificWorkRepositoryMock.Reset();
            _reviewerRepositoryMock.Reset();
            _userRepositoryMock.Reset();
            _emailSenderMock.Reset();
            _reviewersScientificWorkRepositoryMock.Reset();

            var err = await Record.ExceptionAsync(async
                () => await _service.AssignReviewersToScientificWorkAsync());

            err.Should().BeNull();
        }
    }
}

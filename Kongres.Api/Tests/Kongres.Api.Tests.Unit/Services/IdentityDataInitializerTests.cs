using FluentAssertions;
using Kongres.Api.Application.Services;
using Kongres.Api.Domain.Entities;
using Kongres.Api.Domain.Enums;
using Kongres.Api.Tests.Unit.Fakes;
using Microsoft.AspNetCore.Identity;
using Moq;
using Xunit;

namespace Kongres.Api.Tests.Unit.Services
{
    public class IdentityDataInitializerTests
    {
        private readonly Mock<FakeRoleManager> _userManagerMock = new Mock<FakeRoleManager>();

        [Fact]
        public void SeedDataSuccessRoleAdded()
        {
            _userManagerMock.Setup(x => x.CreateAsync(It.Is<Role>(x => x.Name == nameof(UserTypeEnum.Participant) ||
                                                                       x.Name == nameof(UserTypeEnum.Reviewer))))
                            .ReturnsAsync(IdentityResult.Success);

            var err = Record.Exception(() => IdentityDataInitializer.SeedData(_userManagerMock.Object));

            err.Should().BeNull();

            _userManagerMock.Verify(x => x.CreateAsync(It.Is<Role>(x => x.Name == nameof(UserTypeEnum.Participant) ||
                                                                        x.Name == nameof(UserTypeEnum.Reviewer))),
                                    Times.Exactly(2));
        }
    }
}

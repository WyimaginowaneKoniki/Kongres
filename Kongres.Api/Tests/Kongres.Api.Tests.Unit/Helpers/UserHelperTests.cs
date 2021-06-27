using Bogus;
using FluentAssertions;
using Kongres.Api.Application.Helpers;
using Kongres.Api.Domain.Entities;
using Kongres.Api.Domain.Enums;
using Kongres.Api.Infrastructure;
using Moq;
using Xunit;

namespace Kongres.Api.Tests.Unit.Helpers
{
    public class UserHelperTests
    {
        private readonly Faker _faker = new Faker();

        [Fact]
        public void GetFullNameCorrectly()
        {
            var user = new User()
            {
                Name = _faker.Person.FirstName,
                Surname = _faker.Person.LastName
            };

            var expected = $"{user.Name} {user.Surname}";

            var returned = UserHelper.GetFullName(user);

            returned.Should().Be(expected);
        }

        [Theory]
        [InlineData(nameof(UserTypeEnum.Participant))]
        [InlineData(nameof(UserTypeEnum.Reviewer))]
        public void GetRoleCorectly(string role)
        {
            var user = new User()
            {
                UserName = $"{role}:{_faker.Person.Email}"
            };

            var returned = UserHelper.GetRole(user);

            returned.Should().Be(role);
        }

        [Theory]
        [InlineData(UserTypeEnum.Participant)]
        [InlineData(UserTypeEnum.Reviewer)]
        public void GetUserNameCorectly(UserTypeEnum role)
        {
            var email = _faker.Person.Email;
            var expected = $"{role}:{email}";

            var returned = UserHelper.GetUserName(role, email);

            returned.Should().Be(expected);
        }

        [Fact]
        public void GetBase64PhotoReturnNullWhenPhotoNameIsEmpty()
        {
            var fileManagerMock = new Mock<IFileManager>();
            var photoName = "";
            string expected = null;

            var returned = UserHelper.GetBase64Photo(fileManagerMock.Object, photoName);

            returned.Should().Be(expected);

            fileManagerMock.Verify(x => x.GetBase64FileAsync(photoName), Times.Never);
        }

        [Fact]
        public void GetBase64PhotoReturnBase64WhenEverythingIsCorrect()
        {
            var fileManagerMock = new Mock<IFileManager>();
            var photoExtension = "png";
            var photoName = _faker.System.FileName(photoExtension);
            var photo = _faker.Random.String(16);
            string expected = $"data:image/{photoExtension};base64,{photo}";

            fileManagerMock.Setup(x => x.GetBase64FileAsync(photoName)).ReturnsAsync(photo);

            var returned = UserHelper.GetBase64Photo(fileManagerMock.Object, photoName);

            returned.Should().Be(expected);

            fileManagerMock.Verify(x => x.GetBase64FileAsync(photoName), Times.Once);
        }
    }
}

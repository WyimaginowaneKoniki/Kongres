using AutoMapper;
using Bogus;
using FluentAssertions;
using Kongres.Api.Application.Commands.Users;
using Kongres.Api.Application.Helpers;
using Kongres.Api.Application.Mappers.Profiles;
using Kongres.Api.Application.Services;
using Kongres.Api.Application.Services.Interfaces;
using Kongres.Api.Domain.DTOs;
using Kongres.Api.Domain.Entities;
using Kongres.Api.Domain.Enums;
using Kongres.Api.Infrastructure;
using Kongres.Api.Infrastructure.Repositories.Interfaces;
using Kongres.Api.Tests.Unit.Fakes;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.DependencyInjection;
using Moq;
using System;
using System.Security.Authentication;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace Kongres.Api.Tests.Unit.Services
{
    public class UserServiceTests : IDisposable
    {
        private readonly Mock<IJwtHandler> _jwtHandlerMock = new Mock<IJwtHandler>();
        private readonly Mock<IScientificWorkRepository> _scientificWorkRepositoryMock = new Mock<IScientificWorkRepository>();
        private readonly Mock<IFileManager> _fileManagerMock = new Mock<IFileManager>();
        private readonly Mock<IEmailSender> _emailSendeMock = new Mock<IEmailSender>();
        private readonly Mock<FakeUserManager> _userManagerMock = new Mock<FakeUserManager>();
        private readonly Mock<FakeSignInManager> _signInManagerMock = new Mock<FakeSignInManager>();
        private readonly IUserService _userService;
        private readonly Faker _faker = new Faker();
        private readonly IMapper _mapper;

        public UserServiceTests()
        {
            // https://stackoverflow.com/a/38319045/8423793
            var services = new ServiceCollection();
            services.AddMemoryCache();
            var serviceProvider = services.BuildServiceProvider();

            var memoryCache = serviceProvider.GetService<IMemoryCache>();

            var configuration = new MapperConfiguration(cfg
                => cfg.AddProfile<UserProfile>());

            _mapper = new Mapper(configuration);

            _userService = new UserService(_userManagerMock.Object,
                                           _signInManagerMock.Object,
                                           _jwtHandlerMock.Object,
                                           memoryCache,
                                           _scientificWorkRepositoryMock.Object,
                                           _fileManagerMock.Object,
                                           _emailSendeMock.Object,
                                           _mapper);
        }

        public void Dispose()
        {
            _jwtHandlerMock.Reset();
            _scientificWorkRepositoryMock.Reset();
            _fileManagerMock.Reset();
            _emailSendeMock.Reset();
            _userManagerMock.Reset();
            _signInManagerMock.Reset();
        }

        [Fact]
        public async Task GetUserInfoForHeaderAsyncReturnDtoWithScientificWorkId()
        {
            var userId = 1u;

            var user = new User()
            {
                Id = userId,
                Name = _faker.Person.FirstName,
                Surname = _faker.Person.LastName,
                UserName = UserHelper.GetUserName(UserTypeEnum.Participant, _faker.Person.Email)
            };

            var scientificWork = new ScientificWork() { Id = 1 };

            var expectedDto = _mapper.Map<HeaderUserInfoDto>(user);
            expectedDto.ScientificWorkId = scientificWork.Id;

            HeaderUserInfoDto returnedDto = null;

            _userManagerMock.Setup(x => x.FindByIdAsync(userId.ToString())).ReturnsAsync(user);
            _scientificWorkRepositoryMock.Setup(x => x.GetByAuthorIdAsync(userId)).ReturnsAsync(scientificWork);

            var err = await Record.ExceptionAsync(async () => returnedDto = await _userService.GetUserInfoForHeaderAsync(userId.ToString()));

            err.Should().BeNull();

            returnedDto.Should().NotBeNull();
            returnedDto.Should().BeEquivalentTo(expectedDto);

            _userManagerMock.Verify(x => x.FindByIdAsync(userId.ToString()), Times.Once);
            _scientificWorkRepositoryMock.Verify(x => x.GetByAuthorIdAsync(userId), Times.Once);
        }

        [Fact]
        public async Task GetUserInfoForHeaderAsyncReturnDtoWithoutScientificWorkId()
        {
            var userId = 1u;

            var user = new User()
            {
                Id = userId,
                Name = _faker.Person.FirstName,
                Surname = _faker.Person.LastName,
                UserName = UserHelper.GetUserName(UserTypeEnum.Participant, _faker.Person.Email)
            };

            var expectedDto = _mapper.Map<HeaderUserInfoDto>(user);

            HeaderUserInfoDto returnedDto = null;

            _userManagerMock.Setup(x => x.FindByIdAsync(userId.ToString())).ReturnsAsync(user);
            _scientificWorkRepositoryMock.Setup(x => x.GetByAuthorIdAsync(userId)).ReturnsAsync((ScientificWork)null);

            var err = await Record.ExceptionAsync(async () => returnedDto = await _userService.GetUserInfoForHeaderAsync(userId.ToString()));

            err.Should().BeNull();

            returnedDto.Should().NotBeNull();
            returnedDto.Should().BeEquivalentTo(expectedDto);

            _userManagerMock.Verify(x => x.FindByIdAsync(userId.ToString()), Times.Once);
            _scientificWorkRepositoryMock.Verify(x => x.GetByAuthorIdAsync(userId), Times.Once);
        }

        [Fact]
        public async Task GetUserInfoForHeaderAsyncReturnDtoWithPhoto()
        {
            var userId = 1u;
            var randomBase64 = Convert.ToBase64String(Encoding.UTF8.GetBytes(_faker.Random.String(7)));
            var photoExtension = "png";

            var user = new User()
            {
                Id = userId,
                Name = _faker.Person.FirstName,
                Surname = _faker.Person.LastName,
                UserName = UserHelper.GetUserName(UserTypeEnum.Participant, _faker.Person.Email),
                Photo = _faker.System.FileName(photoExtension)
            };

            var expectedDto = _mapper.Map<HeaderUserInfoDto>(user);
            expectedDto.PhotoBase64 = $"data:image/{photoExtension};base64,{randomBase64}";

            HeaderUserInfoDto returnedDto = null;

            _userManagerMock.Setup(x => x.FindByIdAsync(userId.ToString())).ReturnsAsync(user);
            _scientificWorkRepositoryMock.Setup(x => x.GetByAuthorIdAsync(userId)).ReturnsAsync((ScientificWork)null);
            _fileManagerMock.Setup(x => x.GetBase64FileAsync(user.Photo)).ReturnsAsync(randomBase64);

            var err = await Record.ExceptionAsync(async () => returnedDto = await _userService.GetUserInfoForHeaderAsync(userId.ToString()));

            err.Should().BeNull();

            returnedDto.Should().NotBeNull();
            returnedDto.Should().BeEquivalentTo(expectedDto);

            _userManagerMock.Verify(x => x.FindByIdAsync(userId.ToString()), Times.Once);
            _scientificWorkRepositoryMock.Verify(x => x.GetByAuthorIdAsync(userId), Times.Once);
            _fileManagerMock.Verify(x => x.GetBase64FileAsync(user.Photo), Times.Once);
        }

        [Theory]
        [InlineData(UserTypeEnum.Participant)]
        [InlineData(UserTypeEnum.Reviewer)]
        public async Task RegisterAsyncRegisterSuccesfullySendEmailConfirmation(UserTypeEnum userType)
        {
            var command = new CreateUserCommand()
            {
                FirstName = _faker.Person.FirstName,
                LastName = _faker.Person.LastName,
                AcademicTitle = _faker.Name.JobTitle(),
                Email = _faker.Person.Email,
                Specialization = _faker.Commerce.Categories(1)[0],
                University = _faker.Company.CompanyName(),
                Password = _faker.Internet.Password()
            };

            var user = new User
            {
                Id = 0,
                Name = command.FirstName,
                UserName = UserHelper.GetUserName(userType, command.Email),
                Surname = command.LastName,
                Degree = command.AcademicTitle,
                Email = command.Email,
                Specialization = command.Specialization,
                University = command.University
            };

            var token = _faker.Random.String(10);

            _userManagerMock.Setup(x => x.CreateAsync(It.IsAny<User>(), command.Password)).ReturnsAsync(IdentityResult.Success);
            _userManagerMock.Setup(x => x.AddToRoleAsync(It.IsAny<User>(), userType.ToString()));
            _userManagerMock.Setup(x => x.GenerateEmailConfirmationTokenAsync(It.IsAny<User>())).ReturnsAsync(token);

            _emailSendeMock.Setup(x => x.SendConfirmationEmailAsync(user.Id, user.Email, token));

            var err = await Record.ExceptionAsync(async () => await _userService.RegisterAsync(userType, command));

            err.Should().BeNull();

            _userManagerMock.Verify(x => x.CreateAsync(It.Is<User>(x => x.Id == user.Id && x.UserName == user.UserName), command.Password), Times.Once);
            _userManagerMock.Verify(x => x.AddToRoleAsync(It.Is<User>(x => x.Id == user.Id && x.UserName == user.UserName), userType.ToString()), Times.Once);
            _userManagerMock.Verify(x => x.GenerateEmailConfirmationTokenAsync(It.Is<User>(x => x.Id == user.Id && x.UserName == user.UserName)), Times.Once);

            _emailSendeMock.Verify(x => x.SendConfirmationEmailAsync(user.Id, user.Email, token), Times.Once);
        }

        [Fact]
        public async Task RegisterAsyncRegisterParticipantSaveAvatar()
        {
            var userType = UserTypeEnum.Participant;
            var avatar = new FormFile(null, _faker.Random.Long(), _faker.Random.Long(), _faker.Internet.UserName(), _faker.System.FileName("pdf"));
            var fileName = _faker.System.FileName("png");

            var command = new CreateUserCommand()
            {
                Email = _faker.Person.Email,
                Password = _faker.Internet.Password(),
                Avatar = avatar
            };

            var user = new User
            {
                Id = 0,
                UserName = UserHelper.GetUserName(userType, command.Email),
                Email = command.Email,
            };

            var token = _faker.Random.String(10);

            _userManagerMock.Setup(x => x.CreateAsync(It.IsAny<User>(), command.Password)).ReturnsAsync(IdentityResult.Success);
            _userManagerMock.Setup(x => x.AddToRoleAsync(It.IsAny<User>(), userType.ToString()));
            _userManagerMock.Setup(x => x.GenerateEmailConfirmationTokenAsync(It.IsAny<User>())).ReturnsAsync(token);

            _fileManagerMock.Setup(x => x.SaveFileAsync(avatar)).ReturnsAsync(fileName);

            _emailSendeMock.Setup(x => x.SendConfirmationEmailAsync(user.Id, user.Email, token));

            var err = await Record.ExceptionAsync(async () => await _userService.RegisterAsync(userType, command));

            err.Should().BeNull();

            _fileManagerMock.Verify(x => x.SaveFileAsync(avatar), Times.Once);
        }

        [Fact]
        public async Task RegisterAsyncRegisterReviewerDoNotSaveAvatar()
        {
            var userType = UserTypeEnum.Reviewer;

            var command = new CreateUserCommand()
            {
                Email = _faker.Person.Email,
                Password = _faker.Internet.Password(),
            };

            var user = new User
            {
                Id = 0,
                UserName = UserHelper.GetUserName(userType, command.Email),
                Email = command.Email,
            };

            var token = _faker.Random.String(10);

            _userManagerMock.Setup(x => x.CreateAsync(It.IsAny<User>(), command.Password)).ReturnsAsync(IdentityResult.Success);
            _userManagerMock.Setup(x => x.AddToRoleAsync(It.IsAny<User>(), userType.ToString()));
            _userManagerMock.Setup(x => x.GenerateEmailConfirmationTokenAsync(It.IsAny<User>())).ReturnsAsync(token);

            _emailSendeMock.Setup(x => x.SendConfirmationEmailAsync(user.Id, user.Email, token));

            var err = await Record.ExceptionAsync(async () => await _userService.RegisterAsync(userType, command));

            err.Should().BeNull();

            _fileManagerMock.Verify(x => x.SaveFileAsync(It.IsAny<IFormFile>()), Times.Never);
        }

        [Theory]
        [InlineData(UserTypeEnum.Participant)]
        [InlineData(UserTypeEnum.Reviewer)]
        public void LoginAsyncWhenCredentialsAreIncorrectThrowExcpetion(UserTypeEnum userType)
        {
            var command = new LoginUserCommand()
            {
                Email = _faker.Person.Email
            };

            var userName = UserHelper.GetUserName(userType, command.Email);

            _userManagerMock.Setup(x => x.FindByNameAsync(userName)).ReturnsAsync((User)null);

            Func<Task> err = async () => await _userService.LoginAsync(userType, command);

            err.Should().Throw<Exception>();
        }

        [Theory]
        [InlineData(UserTypeEnum.Participant)]
        [InlineData(UserTypeEnum.Reviewer)]
        public async Task LoginAsyncSignInSuccessedCreateJwtToken(UserTypeEnum userType)
        {
            var command = new LoginUserCommand()
            {
                Email = _faker.Person.Email,
                Password = _faker.Internet.Password(),
                TokenId = _faker.Random.Guid()
            };

            var userName = UserHelper.GetUserName(userType, command.Email);

            var user = new User()
            {
                Id = 1
            };

            var jwtToken = "";

            _userManagerMock.Setup(x => x.FindByNameAsync(userName)).ReturnsAsync(user);
            _signInManagerMock.Setup(x => x.PasswordSignInAsync(user, command.Password, false, false)).ReturnsAsync(SignInResult.Success);
            _jwtHandlerMock.Setup(x => x.CreateToken(user.Id, userType.ToString())).Returns(jwtToken);

            var err = await Record.ExceptionAsync(async () => await _userService.LoginAsync(userType, command));

            err.Should().BeNull();

            _signInManagerMock.Verify(x => x.PasswordSignInAsync(user, command.Password, false, false), Times.Once);
            _jwtHandlerMock.Verify(x => x.CreateToken(user.Id, userType.ToString()), Times.Once);
        }

        [Fact]
        public async Task GetUserNameWhenUserIsNotParticipantThrowAuthenticationException()
        {
            var userId = 1u;
            var user = new User() { Id = userId };

            _userManagerMock.Setup(x => x.FindByIdAsync(userId.ToString())).ReturnsAsync(user);
            _userManagerMock.Setup(x => x.IsInRoleAsync(user, nameof(UserTypeEnum.Participant))).ReturnsAsync(false);

            var err = await Record.ExceptionAsync(async () => await _userService.GetUserName(userId.ToString()));

            err.Should().BeOfType<AuthenticationException>();

            _userManagerMock.Verify(x => x.FindByIdAsync(userId.ToString()), Times.Once);
            _userManagerMock.Verify(x => x.IsInRoleAsync(user, nameof(UserTypeEnum.Participant)), Times.Once);
        }

        [Fact]
        public async Task GetUserNameWhenUserHaveScientificWorkThrowInvalidOperationException()
        {
            var userId = 1u;
            var user = new User() { Id = userId };

            _userManagerMock.Setup(x => x.FindByIdAsync(userId.ToString())).ReturnsAsync(user);
            _userManagerMock.Setup(x => x.IsInRoleAsync(user, nameof(UserTypeEnum.Participant))).ReturnsAsync(true);

            _scientificWorkRepositoryMock.Setup(x => x.GetByAuthorIdAsync(userId)).ReturnsAsync(new ScientificWork());

            var err = await Record.ExceptionAsync(async () => await _userService.GetUserName(userId.ToString()));

            err.Should().BeOfType<InvalidOperationException>();

            _userManagerMock.Verify(x => x.FindByIdAsync(userId.ToString()), Times.Once);
            _userManagerMock.Verify(x => x.IsInRoleAsync(user, nameof(UserTypeEnum.Participant)), Times.Once);

            _scientificWorkRepositoryMock.Verify(x => x.GetByAuthorIdAsync(userId), Times.Once);
        }

        [Fact]
        public async Task GetUserNameSuccessReturnUserNameAndSurname()
        {
            var userId = 1u;
            var user = new User()
            {
                Id = userId,
                Name = _faker.Person.FirstName,
                Surname = _faker.Person.LastName
            };

            var expectedStr = UserHelper.GetFullName(user);

            var returnedStr = "";

            _userManagerMock.Setup(x => x.FindByIdAsync(userId.ToString())).ReturnsAsync(user);
            _userManagerMock.Setup(x => x.IsInRoleAsync(user, nameof(UserTypeEnum.Participant))).ReturnsAsync(true);

            _scientificWorkRepositoryMock.Setup(x => x.GetByAuthorIdAsync(userId)).ReturnsAsync((ScientificWork)null);

            var err = await Record.ExceptionAsync(async () => returnedStr = await _userService.GetUserName(userId.ToString()));

            err.Should().BeNull();

            returnedStr.Should().NotBeNullOrWhiteSpace();

            _userManagerMock.Verify(x => x.FindByIdAsync(userId.ToString()), Times.Once);
            _userManagerMock.Verify(x => x.IsInRoleAsync(user, nameof(UserTypeEnum.Participant)), Times.Once);

            _scientificWorkRepositoryMock.Verify(x => x.GetByAuthorIdAsync(userId), Times.Once);
        }

        [Fact]
        public async Task GetInformationFroMyProfileAsyncSuccessReturnDtoWithoutScientificWork()
        {
            var userId = 1u;

            var user = new User()
            {
                Id = userId,
                Name = _faker.Person.FirstName,
                Surname = _faker.Person.LastName,
                Email = _faker.Person.Email,
                Degree = _faker.Name.JobTitle(),
                University = _faker.Company.CompanyName(),
                Specialization = _faker.Commerce.Categories(1)[0],
                UserName = UserHelper.GetUserName(UserTypeEnum.Participant, _faker.Person.Email)
            };

            var expectedDto = _mapper.Map<MyProfileUserDto>(user);

            MyProfileUserDto returnedDto = null;

            _userManagerMock.Setup(x => x.FindByIdAsync(userId.ToString())).ReturnsAsync(user);
            _scientificWorkRepositoryMock.Setup(x => x.GetByAuthorIdAsync(userId)).ReturnsAsync((ScientificWork)null);

            var err = await Record.ExceptionAsync(async () => returnedDto = await _userService.GetInformationForMyProfileAsync(userId.ToString()));

            err.Should().BeNull();

            returnedDto.Should().NotBeNull();
            returnedDto.Should().BeEquivalentTo(expectedDto);

            _userManagerMock.Verify(x => x.FindByIdAsync(userId.ToString()), Times.Once);
            _scientificWorkRepositoryMock.Verify(x => x.GetByAuthorIdAsync(userId), Times.Once);
        }

        [Fact]
        public async Task GetInformationFroMyProfileAsyncSuccessReturnDtoWithScientificWork()
        {
            var userId = 1u;

            var user = new User()
            {
                Id = userId,
                Name = _faker.Person.FirstName,
                Surname = _faker.Person.LastName,
                Email = _faker.Person.Email,
                Degree = _faker.Name.JobTitle(),
                University = _faker.Company.CompanyName(),
                Specialization = _faker.Commerce.Categories(1)[0],
                UserName = UserHelper.GetUserName(UserTypeEnum.Participant, _faker.Person.Email)
            };

            var scientificWork = new ScientificWork() { Id = 1u };


            var expectedDto = _mapper.Map<MyProfileUserDto>(user);
            expectedDto.WorkId = scientificWork.Id;

            MyProfileUserDto returnedDto = null;

            _userManagerMock.Setup(x => x.FindByIdAsync(userId.ToString())).ReturnsAsync(user);
            _scientificWorkRepositoryMock.Setup(x => x.GetByAuthorIdAsync(userId)).ReturnsAsync(scientificWork);

            var err = await Record.ExceptionAsync(async () => returnedDto = await _userService.GetInformationForMyProfileAsync(userId.ToString()));

            err.Should().BeNull();

            returnedDto.Should().NotBeNull();
            returnedDto.Should().BeEquivalentTo(expectedDto);

            _userManagerMock.Verify(x => x.FindByIdAsync(userId.ToString()), Times.Once);
            _scientificWorkRepositoryMock.Verify(x => x.GetByAuthorIdAsync(userId), Times.Once);
        }
    }
}

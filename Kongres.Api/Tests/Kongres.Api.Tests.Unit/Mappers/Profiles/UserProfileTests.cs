using AutoMapper;
using Bogus;
using FluentAssertions;
using Kongres.Api.Application.Helpers;
using Kongres.Api.Application.Mappers.Profiles;
using Kongres.Api.Domain.DTOs;
using Kongres.Api.Domain.Entities;
using Kongres.Api.Domain.Enums;
using Xunit;

namespace Kongres.Api.Tests.Unit.Mappers.Profiles
{
    public class UserProfileTests
    {
        private readonly Faker _faker = new Faker();
        private readonly IMapper _mapper;
        private readonly User user;

        public UserProfileTests()
        {
            var configuration = new MapperConfiguration(cfg
                => cfg.AddProfile<UserProfile>());

            _mapper = new Mapper(configuration);

            var userName = UserHelper.GetUserName(_faker.Random.Enum<UserTypeEnum>(),
                                      _faker.Person.Email);
            user = new User()
            {
                Id = 1u,
                Name = _faker.Person.FirstName,
                Surname = _faker.Person.LastName,
                Email = _faker.Person.Email,
                IsEmailConfirmed = _faker.Random.Bool(),
                NormalizedEmail = _faker.Person.Email.ToUpper(),
                PasswordHash = _faker.Random.String(16),
                UserName = userName,
                NormalizedUserName = userName.ToUpper(),
                University = _faker.Company.CompanyName(),
                Degree = _faker.Commerce.ProductName(),
                Photo = _faker.System.FileName("png"),
                Specialization = _faker.Commerce.Department(1)
            };
        }

        [Fact]
        public void MapUserToHeaderUserInfoDto()
        {
            var expected = new HeaderUserInfoDto()
            {
                Name = UserHelper.GetFullName(user),
                Role = UserHelper.GetRole(user)
            };

            var returned = _mapper.Map<HeaderUserInfoDto>(user);

            returned.Should().BeEquivalentTo(expected);
        }

        [Fact]
        public void MapUserToMyProfileUserDto()
        {
            var expected = new MyProfileUserDto()
            {
                Name = user.Name,
                Surname = user.Surname,
                AcademicTitle = user.Degree,
                Email = user.Email,
                Specialization = user.Specialization,
                Role = UserHelper.GetRole(user),
                University = user.University
            };

            var returned = _mapper.Map<MyProfileUserDto>(user);

            returned.Should().BeEquivalentTo(expected);
        }

        [Fact]
        public void MapUserToUserDto()
        {
            var expected = new UserDto()
            {
                Name = UserHelper.GetFullName(user),
                Degree = user.Degree,
                University = user.University,
                Photo = user.Photo
            };

            var returned = _mapper.Map<UserDto>(user);

            returned.Should().BeEquivalentTo(expected);
        }
    }
}

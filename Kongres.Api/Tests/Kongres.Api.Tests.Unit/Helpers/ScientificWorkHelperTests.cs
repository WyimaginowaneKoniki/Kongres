using Bogus;
using FluentAssertions;
using Kongres.Api.Application.Helpers;
using Kongres.Api.Domain.Entities;
using System.Linq;
using Xunit;

namespace Kongres.Api.Tests.Unit.Helpers
{
    public class ScientificWorkHelperTests
    {
        private readonly Faker _faker = new Faker();

        [Fact]
        public void GetAuthorsWithOthers()
        {
            var mainAuthor = new User()
            {
                Name = _faker.Person.FirstName,
                Surname = _faker.Person.LastName
            };

            var otherAuthors = string.Join(", ", Enumerable.Range(0, 5).Select(_ => _faker.Person.FullName));

            var expected = $"{UserHelper.GetFullName(mainAuthor)}, {otherAuthors}";

            var returned = ScientificWorkHelper.GetAuthors(mainAuthor, otherAuthors);

            returned.Should().Be(expected);
        }

        [Fact]
        public void GetAuthorsWithoutOthers()
        {
            var mainAuthor = new User()
            {
                Name = _faker.Person.FirstName,
                Surname = _faker.Person.LastName
            };

            var expected = _faker.Person.FullName;

            var returned = ScientificWorkHelper.GetAuthors(mainAuthor, null);

            returned.Should().Be(expected);
        }
    }
}

using AutoMapper;
using Bogus;
using FluentAssertions;
using Kongres.Api.Application.Helpers;
using Kongres.Api.Application.Mappers.Profiles;
using Kongres.Api.Application.Mappers.ValueConverters;
using Kongres.Api.Domain.DTOs;
using Kongres.Api.Domain.Entities;
using Kongres.Api.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using Xunit;

namespace Kongres.Api.Tests.Unit.Mappers.Profiles
{
    public class ScientificWorkProfileTests
    {
        private readonly Faker _faker = new Faker();
        private readonly IMapper _mapper;
        private readonly ScientificWork _scientificWork;
        private readonly DateTimeFormatter _dateTimeFormatter = new DateTimeFormatter();

        public ScientificWorkProfileTests()
        {
            var configuration = new MapperConfiguration(cfg
                => cfg.AddProfile<ScientificWorkProfile>());

            _mapper = new Mapper(configuration);

            var versionsId = 1u;
            var reviewersId = 1u;
            var reviewId = 1u;
            var answerId = 1u;
            var users = new Faker<User>()
                .RuleFor(o => o.Id, f => reviewersId++)
                .RuleFor(o => o.Name, f => f.Person.FirstName)
                .RuleFor(o => o.Surname, f => f.Person.LastName)
                .Generate(3);

            var versions = new List<ScientificWorkFile>()
            {
                new ScientificWorkFile(){
                    Id = ++versionsId,
                    Version = (byte)versionsId,
                    DateAdd = DateTime.UtcNow.AddDays(versionsId),
                    Reviews = new List<Review>()
                    {
                        new Review()
                        {
                            Id = reviewId++,
                            DateReview = DateTime.UtcNow,
                            Comment = _faker.Rant.Review(),
                            Rating = _faker.Random.Byte(1, 3),
                            Reviewer = users[1]
                        },
                        new Review()
                        {
                            Id = reviewId++,
                            DateReview = DateTime.UtcNow,
                            File = _faker.System.FileName("pdf"),
                            Rating = _faker.Random.Byte(1, 3),
                            Reviewer = users[2],
                            Answer = new Answer()
                            {
                                Id = answerId++,
                                Comment = _faker.Lorem.Sentence(5),
                                AnswerDate = DateTime.UtcNow,
                                User = users[0]
                            }
                        }
                    }
                },
                new ScientificWorkFile(){
                    Id = ++versionsId,
                    Version = (byte)versionsId,
                    DateAdd = DateTime.UtcNow.AddDays(versionsId),
                    Reviews = new List<Review>()
                    {
                        new Review()
                        {
                            Id = reviewId++,
                            DateReview = DateTime.UtcNow,
                            File = _faker.System.FileName("pdf"),
                            Rating = _faker.Random.Byte(1, 3),
                            Reviewer = users[1],
                            Answer = new Answer()
                            {
                                Id = answerId++,
                                Comment = _faker.Lorem.Sentence(5),
                                AnswerDate = DateTime.UtcNow,
                                User = users[0]
                            }
                        },
                        new Review()
                        {
                            Id = reviewId++,
                            DateReview = DateTime.UtcNow,
                            Comment = _faker.Rant.Review(),
                            Rating = _faker.Random.Byte(1, 3),
                            Reviewer = users[2]
                        }
                    }
                },
            };

            _scientificWork = new ScientificWork()
            {
                Id = 1u,
                CreationDate = _faker.Date.Recent(),
                Description = _faker.Commerce.ProductDescription(),
                MainAuthor = new User() { Name = _faker.Person.FirstName, Surname = _faker.Person.LastName },
                Name = _faker.Commerce.ProductName(),
                Specialization = _faker.Commerce.Department(1),
                Status = _faker.Random.Enum<StatusEnum>(),
                OtherAuthors = string.Join(", ", Enumerable.Range(0, 3).Select(_ => _faker.Person.FullName)),
                Versions = versions
            };
        }

        [Fact]
        public void MapScientificWorkToScientificWorkDto()
        {
            var expected = new ScientificWorkDto()
            {
                Id = _scientificWork.Id,
                Title = _scientificWork.Name,
                Authors = ScientificWorkHelper.GetAuthors(_scientificWork.MainAuthor, _scientificWork.OtherAuthors),
                CreationDate = _dateTimeFormatter.Convert(_scientificWork.CreationDate, null),
                Description = _scientificWork.Description,
                Specialization = _scientificWork.Specialization,
                UpdateDate = _dateTimeFormatter.Convert(_scientificWork.Versions.Last().DateAdd, null)
            };

            var returned = _mapper.Map<ScientificWorkDto>(_scientificWork);

            returned.Should().BeEquivalentTo(expected);
        }

        [Fact]
        public void MapScientificWorkToScientificWorkWithOtherAuthorsDto()
        {
            var expected = new ScientificWorkWithOtherAuthorsDto()
            {
                Id = _scientificWork.Id,
                Title = _scientificWork.Name,
                OtherAuthors = _scientificWork.OtherAuthors,
                CreationDate = _dateTimeFormatter.Convert(_scientificWork.CreationDate, null),
                Description = _scientificWork.Description,
                Specialization = _scientificWork.Specialization,
                UpdateDate = _dateTimeFormatter.Convert(_scientificWork.Versions.Last().DateAdd, null)
            };

            var returned = _mapper.Map<ScientificWorkWithOtherAuthorsDto>(_scientificWork);

            returned.Should().BeEquivalentTo(expected);
        }

        [Fact]
        public void MapScientificWorkToScientificWorkWithStatusDto()
        {
            var expected = new ScientificWorkWithStatusDto()
            {
                Id = _scientificWork.Id,
                Title = _scientificWork.Name,
                Authors = ScientificWorkHelper.GetAuthors(_scientificWork.MainAuthor, _scientificWork.OtherAuthors),
                CreationDate = _dateTimeFormatter.Convert(_scientificWork.CreationDate, null),
                Description = _scientificWork.Description,
                Specialization = _scientificWork.Specialization,
                UpdateDate = _dateTimeFormatter.Convert(_scientificWork.Versions.Last().DateAdd, null),
                Status = _scientificWork.Status.ToString()
            };

            var returned = _mapper.Map<ScientificWorkWithStatusDto>(_scientificWork);

            returned.Should().BeEquivalentTo(expected);
        }

        [Fact]
        public void MapReviewToReviewDto()
        {
            var reviews = _scientificWork.Versions.SelectMany(x => x.Reviews).ToList();

            var expected = reviews.Select(x => new ReviewDto()
            {
                Id = x.Id,
                ReviewDate = _dateTimeFormatter.Convert(x.DateReview, null),
                ReviewMsg = x.Comment,
                Rating = x.Rating,
                IsReviewFileExist = !string.IsNullOrWhiteSpace(x.File),
                AnswerDate = x.Answer != null ? _dateTimeFormatter.Convert(x.Answer.AnswerDate, null) : null,
                AnswerMsg = x.Answer != null ? x.Answer.Comment : null,
            });

            var returned = _mapper.Map<List<ReviewDto>>(reviews);

            returned.Should().BeEquivalentTo(expected);
        }

        [Fact]
        public void MapScientificWorkFileToVersionDto()
        {
            var versions = _scientificWork.Versions;

            var expected = versions.Select(x => new VersionDto()
            {
                Date = _dateTimeFormatter.Convert(x.DateAdd, null),
                Rating = x.Rating,
                VersionNumber = x.Version,
                Reviews = x.Reviews.Select(y => new ReviewDto()
                {
                    Id = y.Id,
                    ReviewDate = _dateTimeFormatter.Convert(y.DateReview, null),
                    ReviewMsg = y.Comment,
                    Rating = y.Rating,
                    IsReviewFileExist = !string.IsNullOrWhiteSpace(y.File),
                    AnswerDate = y.Answer != null ? _dateTimeFormatter.Convert(y.Answer.AnswerDate, null) : null,
                    AnswerMsg = y.Answer != null ? y.Answer.Comment : null,
                })
            });

            var returned = _mapper.Map<List<VersionDto>>(versions);

            returned.Should().BeEquivalentTo(expected);
        }
    }
}

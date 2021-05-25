using AutoMapper;
using Kongres.Api.Application.Helpers;
using Kongres.Api.Application.Mappers.ValueConverters;
using Kongres.Api.Domain.DTOs;
using Kongres.Api.Domain.Entities;
using System.Linq;

namespace Kongres.Api.Application.Mappers.Profiles
{
    public class ScientificWorkProfile : Profile
    {
        public ScientificWorkProfile()
        {
            CreateMap<ScientificWork, ScientificWorkDto>()
                .ForMember(dto => dto.Title, o => o.MapFrom(x => x.Name))
                .ForMember(dto => dto.Authors, o => o.MapFrom(x => ScientificWorkHelper.GetAuthors(x.MainAuthor, x.OtherAuthors)))
                .ForMember(dto => dto.CreationDate, o => o.ConvertUsing(new DateTimeFormatter(), x => x.CreationDate))
                .ForMember(dto => dto.UpdateDate, o => o.ConvertUsing(new DateTimeFormatter(), x => x.Versions.OrderBy(y => y.Version).Last().DateAdd));

            CreateMap<ScientificWork, ScientificWorkWithOtherAuthorsDto>()
                .ForMember(dto => dto.Title, o => o.MapFrom(x => x.Name))
                .ForMember(dto => dto.CreationDate, o => o.ConvertUsing(new DateTimeFormatter(), x => x.CreationDate))
                .ForMember(dto => dto.UpdateDate, o => o.ConvertUsing(new DateTimeFormatter(), x => x.Versions.OrderBy(y => y.Version).Last().DateAdd));

            CreateMap<ScientificWork, ScientificWorkWithStatusDto>()
                .ForMember(dto => dto.Title, o => o.MapFrom(x => x.Name))
                .ForMember(dto => dto.Authors, o => o.MapFrom(x => ScientificWorkHelper.GetAuthors(x.MainAuthor, x.OtherAuthors)))
                .ForMember(dto => dto.CreationDate, o => o.ConvertUsing(new DateTimeFormatter(), x => x.CreationDate))
                .ForMember(dto => dto.UpdateDate, o => o.ConvertUsing(new DateTimeFormatter(), x => x.Versions.OrderBy(y => y.Version).Last().DateAdd))
                .ForMember(dto => dto.Status, o => o.MapFrom(x => x.Status.ToString()));

            CreateMap<Review, ReviewDto>()
                .ForMember(dto => dto.ReviewDate, o => o.ConvertUsing(new DateTimeFormatter(), x => x.DateReview))
                .ForMember(dto => dto.ReviewMsg, o => o.MapFrom(x => x.Comment))
                .ForMember(dto => dto.IsReviewFileExist, o => o.MapFrom(x => !string.IsNullOrWhiteSpace(x.File)))
                .ForMember(dto => dto.AnswerDate, o =>
                {
                    o.PreCondition(x => x.Answer != null);
                    o.ConvertUsing(new DateTimeFormatter(), x => x.Answer.AnswerDate);
                })
                .ForMember(dto => dto.AnswerMsg, o =>
                {
                    o.PreCondition(x => x.Answer != null);
                    o.MapFrom(x => x.Answer.Comment);
                });

            CreateMap<ScientificWorkFile, VersionDto>()
                .ForMember(dto => dto.Date, o => o.ConvertUsing(new DateTimeFormatter(), x => x.DateAdd))
                .ForMember(dto => dto.VersionNumber, o => o.MapFrom(x => x.Version));
        }
    }
}

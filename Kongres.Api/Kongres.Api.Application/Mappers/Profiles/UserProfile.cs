using AutoMapper;
using Kongres.Api.Application.Helpers;
using Kongres.Api.Domain.DTOs;
using Kongres.Api.Domain.Entities;

namespace Kongres.Api.Application.Mappers.Profiles
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<User, HeaderUserInfoDto>()
                .ForMember(dto => dto.Name, o => o.MapFrom(x => UserHelper.GetFullName(x)))
                .ForMember(dto => dto.Role, o => o.MapFrom(x => UserHelper.GetRole(x)));

            CreateMap<User, MyProfileUserDto>()
                .ForMember(dto => dto.AcademicTitle, o => o.MapFrom(x => x.Degree))
                .ForMember(dto => dto.Role, o => o.MapFrom(x => UserHelper.GetRole(x)));

            CreateMap<User, UserDto>()
                .ForMember(dto => dto.Name, o => o.MapFrom(x => UserHelper.GetFullName(x)));
        }
    }
}

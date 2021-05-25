using AutoMapper;
using Kongres.Api.Domain.DTOs;
using Kongres.Api.Domain.Entities;
using System;

namespace Kongres.Api.Application.Mappers.Profiles
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<User, HeaderUserInfoDto>()
                .ForMember(dto => dto.Name, o => o.MapFrom(x => $"{x.Name} {x.Surname}"))
                .ForMember(dto => dto.Role, o => o.MapFrom(x => x.UserName.Split(":", StringSplitOptions.None)[0]));

            CreateMap<User, MyProfileUserDto>()
                .ForMember(dto => dto.AcademicTitle, o => o.MapFrom(x => x.Degree))
                .ForMember(dto => dto.Role, o => o.MapFrom(x => x.UserName.Split(":", StringSplitOptions.None)[0]));

            CreateMap<User, UserDto>()
                .ForMember(dto => dto.Name, o => o.MapFrom(x => $"{x.Name} {x.Surname}"));
        }
    }
}

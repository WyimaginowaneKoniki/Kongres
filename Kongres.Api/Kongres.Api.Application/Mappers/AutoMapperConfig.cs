using AutoMapper;
using Kongres.Api.Application.Mappers.Profiles;

namespace Kongres.Api.Application.Mappers
{
    public static class AutoMapperConfig
    {
        public static IMapper Initialize()
            => new MapperConfiguration(cfg =>
            {
                cfg.AddProfile<UserProfile>();
                cfg.AddProfile<ScientificWorkProfile>();
            }).CreateMapper();
    }
}

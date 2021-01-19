using Autofac;
using Kongres.Api.Domain.Settings;
using Microsoft.Extensions.Configuration;

namespace Kongres.Api.Application.Modules
{
    public class SettingsModule : Autofac.Module
    {
        private readonly IConfiguration _configuration;

        public SettingsModule(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterInstance(_configuration.GetSection("Jwt").Get<JwtSettings>())
                   .SingleInstance();

            builder.RegisterInstance(_configuration.GetSection("StagesTime").Get<StagesTime>())
                .SingleInstance();
        }
    }
}

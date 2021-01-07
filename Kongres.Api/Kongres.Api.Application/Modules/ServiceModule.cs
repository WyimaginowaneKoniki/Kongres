using System.Reflection;
using Autofac;
using Kongres.Api.Application.Services;

namespace Kongres.Api.Application.Modules
{
    public class ServiceModule : Autofac.Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            var assembly = typeof(IJwtHandler)
                .GetTypeInfo()
                .Assembly;

            builder.RegisterType<JwtHandler>()
                   .As<IJwtHandler>()
                   .SingleInstance();
        }
    }
}

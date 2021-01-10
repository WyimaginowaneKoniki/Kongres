using Autofac;
using Kongres.Api.Infrastructure.Repositories.Interfaces;
using System.Reflection;

namespace Kongres.Api.Application.Modules
{
    public class RepositoryModule :Autofac.Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            var assembly = typeof(IRepository)
                .GetTypeInfo()
                .Assembly;

            builder.RegisterAssemblyTypes(assembly)
                .Where(x => x.IsAssignableTo<IRepository>())
                .AsImplementedInterfaces()
                .InstancePerLifetimeScope();
        }
    }
}

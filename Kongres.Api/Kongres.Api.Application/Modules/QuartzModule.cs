using Autofac;
using Autofac.Extras.Quartz;
using Kongres.Api.Application.Quartz.Jobs;
using System.Reflection;

namespace Kongres.Api.Application.Modules
{
    public class QuartzModule : Autofac.Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            var assembly = typeof(TempJob)
                .GetTypeInfo()
                .Assembly;

            // 1) Register IScheduler
            builder.RegisterModule(new QuartzAutofacFactoryModule());
            // // 2) Register jobs
            builder.RegisterModule(new QuartzAutofacJobsModule(assembly));
        }
    }
}

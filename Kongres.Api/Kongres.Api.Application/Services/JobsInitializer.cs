using Kongres.Api.Application.Quartz.Jobs;
using Kongres.Api.Application.Services.Interfaces;
using Kongres.Api.Domain.Settings;
using Quartz;
using System;
using System.Threading.Tasks;

namespace Kongres.Api.Application.Services
{
    public class JobsInitializer : IJobsInitializer
    {
        private readonly IScheduler _scheduler;
        private readonly StagesTime _stagesTime;

        public JobsInitializer(IScheduler scheduler, StagesTime stagesTime)
        {
            _scheduler = scheduler;
            _stagesTime = stagesTime;
        }

        public async Task SeedJobsAsync()
        {
            var job = JobBuilder.Create<AssignReviewersToWorkJob>()
                        .WithIdentity("AssignReviewersToWorkJob", "endOfFirstStage")
                        .Build();

            var trigger = TriggerBuilder.Create()
                            .WithIdentity("AssignReviewersToWorkTrigger", "endOfFirstStage")
                            .StartAt(DateTimeOffset.Parse(_stagesTime.StaticDeadlines.EndOfRegister))
                            .Build();

            await _scheduler.ScheduleJob(job, trigger);

            await _scheduler.Start();
        }
    }
}

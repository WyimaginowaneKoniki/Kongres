using Quartz;
using System.Threading.Tasks;

namespace Kongres.Api.Application.Quartz.Jobs
{
    public class TempJob : IJob
    {

        public Task Execute(IJobExecutionContext context)
        {
            // Randomize Reviewers
            return Task.CompletedTask;
        }
    }
}

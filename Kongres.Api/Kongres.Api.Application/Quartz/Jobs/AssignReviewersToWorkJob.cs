using System.Diagnostics;
using Quartz;
using System.Threading.Tasks;

namespace Kongres.Api.Application.Quartz.Jobs
{
    public class AssignReviewersToWorkJob : IJob
    {

        public Task Execute(IJobExecutionContext context)
        {
            // Randomize Reviewers
            Debug.WriteLine("Hello my friend");
            return Task.CompletedTask;
        }
    }
}

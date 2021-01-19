using System.Diagnostics;
using Quartz;
using System.Threading.Tasks;
using Kongres.Api.Application.Services.Interfaces;

namespace Kongres.Api.Application.Quartz.Jobs
{
    public class AssignReviewersToWorkJob : IJob
    {
        private readonly IManagementService _fooService;

        public AssignReviewersToWorkJob(IManagementService fooService)
        {
            _fooService = fooService;
        }

        public async Task Execute(IJobExecutionContext context)
        {
            // TODO: Block reviewer registration

            await _fooService.AssignReviewersToScientificWorkAsync();
        }
    }
}

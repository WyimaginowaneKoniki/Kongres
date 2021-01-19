using System.Threading.Tasks;

namespace Kongres.Api.Application.Services.Interfaces
{
    public interface IJobsInitializer : IService
    {
        Task SeedJobsAsync();
    }
}

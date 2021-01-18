using System.Threading.Tasks;

namespace Kongres.Api.Application.Services.Interfaces
{
    public interface IManagementService : IService
    {
        Task AssignReviewersToScientificWorkAsync();
    }
}

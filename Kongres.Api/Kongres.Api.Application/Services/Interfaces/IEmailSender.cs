using System.Threading.Tasks;

namespace Kongres.Api.Application.Services.Interfaces
{
    public interface IEmailSender : IService
    {
        Task SendConfirmationEmailAsync(uint userId, string userEmail, string confirmationToken);
        Task SendReceiveReviewEmailAsync(uint userId, string userEmail, string confirmationToken);
    }
}

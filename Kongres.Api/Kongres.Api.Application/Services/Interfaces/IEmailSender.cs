using System.Threading.Tasks;

namespace Kongres.Api.Application.Services.Interfaces
{
    public interface IEmailSender : IService
    {
        Task SendConfirmationEmailAsync(uint userId, string userEmail, string confirmationToken);
        Task SendReceiveReviewEmailAsync(string userEmail, uint workId);
        Task SendNewVersionEnabledEmailAsync(string userEmail, uint workId);
        Task SendReceiveAnswerEmailAsync(string userEmail, uint workId);
        Task SendAddedNewVersionEmailAsync(string userEmail, uint workId);
        Task SendWorkAssignmentInformationAsync(string reviewerEmail, uint workId);
        Task SendReviewersAssignmentInformationAsync(string authorEmail, uint workId);
        Task SendDoNotGetAssignToAnyWork (string reviewerEmail);
        Task SendWorkDidNotGetReviewers(string authorEmail);
        Task SendToAuthorWorkGotAcceptedAsync(string authorEmail, uint workId);
        Task SendToAuthorWorkGotRejectedAsync(string authorEmail, uint workId);
    }
}

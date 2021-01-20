using System.Threading.Tasks;

namespace Kongres.Api.Application.Services.Interfaces
{
    public interface IEmailSender : IService
    {
        #region Reviewer
        Task SendDoNotGetAssignToAnyWork(string reviewerEmail);
        Task SendWorkAssignmentInformationAsync(string reviewerEmail, uint workId);
        Task SendReceiveAnswerEmailAsync(string reviewerEmail, uint workId);
        Task SendAddedNewVersionEmailAsync(string reviewerEmail, uint workId);
        #endregion

        #region AuthorOfWork
        Task SendWorkDidNotGetReviewers(string authorEmail);
        Task SendReviewersAssignmentInformationAsync(string authorEmail, uint workId);
        Task SendReceiveReviewEmailAsync(string authorEmail, uint workId);
        Task SendNewVersionEnabledEmailAsync(string authorEmail, uint workId);
        Task SendToAuthorWorkGotAcceptedAsync(string authorEmail, uint workId);
        Task SendToAuthorWorkGotRejectedAsync(string authorEmail, uint workId);
        #endregion

        #region User
        Task SendConfirmationEmailAsync(uint userId, string userEmail, string confirmationToken);
        #endregion
    }
}

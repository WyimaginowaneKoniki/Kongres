using Kongres.Api.Application.Services.Interfaces;
using NETCore.MailKit.Core;
using System.Threading.Tasks;

namespace Kongres.Api.Application.Services
{
    public class EmailSender : IEmailSender
    {
        private readonly IEmailService _emailService;

        private const string WorkLink = "https://localhost:5001/scientific-works/";

        public EmailSender(IEmailService emailService)
        {
            _emailService = emailService;
        }

        #region Reviewer        
        public async Task SendDoNotGetAssignToAnyWork(string reviewerEmail)
        {
            const string message = "Unfortunately, you were not assigned to any scientific work, because of too few applicants";
            await _emailService.SendAsync(reviewerEmail, "Work review", message);
        }

        public async Task SendWorkAssignmentInformationAsync(string reviewerEmail, uint workId)
        {
            var message = $"<a href='{WorkLink}{workId}'>You have been assigned to scientific work! Go check it out</a>";
            await _emailService.SendAsync(reviewerEmail, "Work review", message, true);
        }

        public async Task SendReceiveAnswerEmailAsync(string reviewerEmail, uint workId)
        {
            var message = $"<a href='{WorkLink}{workId}'>You have received a reply to the review!</a>";
            await _emailService.SendAsync(reviewerEmail, "Work review", message, true);
        }

        public async Task SendAddedNewVersionEmailAsync(string reviewerEmail, uint workId)
        {
            var message = $"<a href='{WorkLink}{workId}'>A new version of the work has been added. You can review it now!</a>";
            await _emailService.SendAsync(reviewerEmail, "Work review", message, true);
        }
        #endregion

        #region AuthorOfWork
        public async Task SendWorkDidNotGetReviewers(string authorEmail)
        {
            const string message = "Unfortunately, no reviewer has been assigned to your scientific work, because of too few applicants";
            await _emailService.SendAsync(authorEmail, "Work review", message);
        }

        public async Task SendReviewersAssignmentInformationAsync(string authorEmail, uint workId)
        {
            var message = $"<a href='{WorkLink}{workId}''>Reviewers have just been assigned to your scientific work! Stay tuned for the reviews</a>";
            await _emailService.SendAsync(authorEmail, "Work review", message, true);
        }

        public async Task SendReceiveReviewEmailAsync(string authorEmail, uint workId)
        {
            var message = $"<a href='{WorkLink}{workId}'>Your work has been reviewed!</a>";
            await _emailService.SendAsync(authorEmail, "Work review", message, true);
        }

        // When all reviews are received and author can add new version of his work
        public async Task SendNewVersionEnabledEmailAsync(string authorEmail, uint workId)
        {
            var message = $"<a href='{WorkLink}{workId}'>Your work has been rated by all reviewers. You can add a new version now!</a>";

            await _emailService.SendAsync(authorEmail, "Work review", message, true);
        }

        public async Task SendToAuthorWorkGotAcceptedAsync(string authorEmail, uint workId)
        {
            var message = $"<a href='{WorkLink}{workId}'>Congratulations! Your scientific work is accepted now</a>";
            await _emailService.SendAsync(authorEmail, "Work review", message, true);
        }

        public async Task SendToAuthorWorkGotRejectedAsync(string authorEmail, uint workId)
        {
            var message = $"<a href='{WorkLink}{workId}'>Unfortunately, your scientific work is rejected</a>";
            await _emailService.SendAsync(authorEmail, "Work review", message, true);
        }
        #endregion

        #region User
        public async Task SendConfirmationEmailAsync(uint userId, string userEmail, string confirmationToken)
        {
            var link = $"https://localhost:5001/activation?confirmToken={confirmationToken}&userId={userId}";

            var message = $"<a href='{link}'>Please confirm email</a>";
            await _emailService.SendAsync(userEmail, "Verify account", message, true);
        }
        #endregion
    }
}

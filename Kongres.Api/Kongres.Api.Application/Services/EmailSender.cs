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
            var message = "Unfortunately, you were not assigned to any scientific work, because of too few applicants.";
            message += $"Thank you for your commitment! You can still see scientific works. <a href='{WorkLink}'>Go to scientific works page</a>";

            await _emailService.SendAsync(reviewerEmail, "Bad news", message);
        }

        public async Task SendWorkAssignmentInformationAsync(string reviewerEmail, uint workId)
        {
            var message = $"You have been assigned to scientific work! <a href='{WorkLink}{workId}'>Go check it out</a>";
            await _emailService.SendAsync(reviewerEmail, "You have been assigned to scientific work", message, true);
        }

        public async Task SendReceiveAnswerEmailAsync(string reviewerEmail, uint workId)
        {
            var message = $"You have received a reply to the review! <a href='{WorkLink}{workId}'>Go check it out</a>";
            await _emailService.SendAsync(reviewerEmail, "Reply to the review", message, true);
        }

        public async Task SendAddedNewVersionEmailAsync(string reviewerEmail, uint workId)
        {
            var message = $"A new version of the work has been added. You can review it now! <a href='{WorkLink}{workId}'>Go check it out</a>";
            await _emailService.SendAsync(reviewerEmail, "New version of work", message, true);
        }
        #endregion

        #region AuthorOfWork
        public async Task SendWorkDidNotGetReviewers(string authorEmail)
        {
            var message = "Unfortunately, you were not assigned to any scientific work, because of too few applicants.";
            message += $"Thank you for your commitment! You can still see scientific works. <a href='{WorkLink}'>Go to scientific works page</a>";

            await _emailService.SendAsync(authorEmail, "Bad news", message);
        }

        public async Task SendReviewersAssignmentInformationAsync(string authorEmail, uint workId)
        {
            var message = $"Reviewers have just been assigned to your scientific work! Stay tuned for the reviews.";
            message += $"<a href='{WorkLink}{workId}'>Go to work page</a>";
            await _emailService.SendAsync(authorEmail, "Stay tuned for the reviews", message, true);
        }

        public async Task SendReceiveReviewEmailAsync(string authorEmail, uint workId)
        {
            var message = $"Your work has been reviewed! <a href='{WorkLink}{workId}'>Go to work page</a>";
            await _emailService.SendAsync(authorEmail, "New review", message, true);
        }

        // When all reviews are received and author can add new version of his work
        public async Task SendNewVersionEnabledEmailAsync(string authorEmail, uint workId)
        {
            var message = "Your work has been rated by all reviewers and they have some suggestions. You can add a new version now! ";
            message += $"<a href='{WorkLink}{workId}'>Go to work page</a>";

            await _emailService.SendAsync(authorEmail, "All reviewers added their reviews", message, true);
        }

        public async Task SendToAuthorWorkGotAcceptedAsync(string authorEmail, uint workId)
        {
            var message = $"Congratulations! Your scientific work has just been accepted! <a href='{WorkLink}{workId}'>See reviews</a>";
            await _emailService.SendAsync(authorEmail, "Your scientific work has been accepted", message, true);
        }

        public async Task SendToAuthorWorkGotRejectedAsync(string authorEmail, uint workId)
        {
            var message = $"Unfortunately, your scientific work is rejected <a href='{WorkLink}{workId}'>Check reviews</a>";
            await _emailService.SendAsync(authorEmail, "All reviewers added their reviews", message, true);
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

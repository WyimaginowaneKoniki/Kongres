using Kongres.Api.Application.Services.Interfaces;
using NETCore.MailKit.Core;
using System.Threading.Tasks;

namespace Kongres.Api.Application.Services
{
    public class EmailSender : IEmailSender
    {
        private readonly IEmailService _emailService;

        public EmailSender(IEmailService emailService)
        {
            _emailService = emailService;
        }

        public async Task SendConfirmationEmailAsync(uint userId, string userEmail, string confirmationToken)
        {
            var link = $"https://localhost:5001/activation?confirmToken={confirmationToken}&userId={userId}";

            var message = $"<a href='{link}'>Please confirm email</a>";
            await _emailService.SendAsync(userEmail, "Verify account", message, true);
        }

        public async Task SendReceiveReviewEmailAsync(string userEmail, uint workId)
        {
            var link = $"https://localhost:5001/scientific-works/{workId}";

            var message = $"<a href='{link}'>Your work has been reviewed!</a>";
            await _emailService.SendAsync(userEmail, "Work review", message, true);
        }

        // When all reviews are received and author can add new version of his work
        public async Task SendNewVersionEnabledEmailAsync(string userEmail, uint workId)
        {
            var link = $"https://localhost:5001/scientific-works/{workId}";

            var message = $"<a href='{link}'>Your work has been rated by all reviewers. You can add a new version now!</a>";
           
            await _emailService.SendAsync(userEmail, "Work review", message, true);
        }
        public async Task SendReceiveAnswerEmailAsync(string userEmail, uint workId)
        {
            var link = $"https://localhost:5001/scientific-works/{workId}";

            var message = $"<a href='{link}'>You have received a reply to the review!</a>";
            await _emailService.SendAsync(userEmail, "Work review", message, true);
        }

        public async Task SendAddedNewVersionEmailAsync(string userEmail, uint workId)
        {
            var link = $"https://localhost:5001/scientific-works/{workId}";

            var message = $"<a href='{link}'>A new version of the work has been added. You can review it now!</a>";
            await _emailService.SendAsync(userEmail, "Work review", message, true);
        }

        public async Task SendWorkAssignmentInformationAsync(string reviewerEmail, uint workId)
        {
            var link = $"https://localhost:5001/scientific-works/{workId}";

            var message = $"<a href='{link}'>You have been assigned to scientific work! Go check it out</a>";
            await _emailService.SendAsync(reviewerEmail, "Work review", message, true);
        }
    }
}

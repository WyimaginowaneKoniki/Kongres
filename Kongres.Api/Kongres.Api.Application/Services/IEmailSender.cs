using Kongres.Api.Application.Services.Interfaces;
using NETCore.MailKit.Core;
using System.Threading.Tasks;

namespace Kongres.Api.Application.Services
{
    public class EmailSenderService : IEmailSender
    {
        private readonly IEmailService _emailService;

        public EmailSenderService(IEmailService emailService)
        {
            _emailService = emailService;
        }

        public async Task SendConfirmationEmailAsync(uint userId, string userEmail, string confirmationToken)
        {
            var link = $"https://localhost:5001/email-confirm-token?confirmToken={confirmationToken}&userId={userId}";

            var message = $"<a href='{link}'>Please confirm email</a>";
            await _emailService.SendAsync(userEmail, "Verify account", message, true);
        }
    }
}

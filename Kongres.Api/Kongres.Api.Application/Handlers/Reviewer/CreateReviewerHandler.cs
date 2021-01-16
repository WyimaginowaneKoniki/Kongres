using System.Threading;
using System.Threading.Tasks;
using Kongres.Api.Application.Commands.Reviewer;
using Kongres.Api.Domain.Entities;
using Kongres.Api.Domain.Enums;
using MediatR;
using Microsoft.AspNetCore.Identity;
using NETCore.MailKit.Core;

namespace Kongres.Api.Application.Handlers.Reviewer
{
    public class CreateReviewerHandler : AsyncRequestHandler<CreateReviewerCommand>
    {
        private readonly UserManager<User> _userManager;
        private readonly IEmailService _emailService;

        public CreateReviewerHandler(UserManager<User> userManager, IEmailService emailService)
        {
            _userManager = userManager;
            _emailService = emailService;
        }

        protected override async Task Handle(CreateReviewerCommand request, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();

            const UserTypeEnum userType = UserTypeEnum.Reviewer;
            var userName = $"{userType}:{request.Email}";

            var user = new User
            {
                Name = request.FirstName,
                UserName = userName,
                Surname = request.LastName,
                Degree = request.AcademicTitle,
                Email = request.Email,
                Specialization = request.Specialization,
                University = request.University
            };

            var createUserResult = await _userManager.CreateAsync(user, request.Password);

            if (createUserResult.Succeeded)
            {
                await _userManager.AddToRoleAsync(user, userType.ToString());

                var verificationToken = await _userManager.GenerateEmailConfirmationTokenAsync(user);

                var link = $"https://localhost:5001/email-confirm-token?confirmToken={verificationToken}&userId={user.Id}";

                var message = $"<a href='{link}'>Please confirm email</a>";
                await _emailService.SendAsync(request.Email, "Verify account", message, true);
            }
        }
    }
}

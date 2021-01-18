using Kongres.Api.Application.Queries.Users;
using MediatR;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Kongres.Api.Domain.Entities;

namespace Kongres.Api.Application.Handlers.Users
{
    public class ConfirmUserHandler : AsyncRequestHandler<ConfirmUserQuery>
    {
        private readonly UserManager<User> _userManager;
        public ConfirmUserHandler(UserManager<User> userManager)
        {
            _userManager = userManager;
        }

        protected override async Task Handle(ConfirmUserQuery request, CancellationToken cancellationToken)
        {
            var user = await _userManager.FindByIdAsync(request.UserId);
            await _userManager.ConfirmEmailAsync(user, request.ConfirmToken);
        }
    }
}

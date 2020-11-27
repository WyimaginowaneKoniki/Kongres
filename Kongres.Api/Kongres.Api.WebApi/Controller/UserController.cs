using System.Threading.Tasks;
using Kongres.Api.Application.Commands.Users;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Kongres.Api.WebApi.Controller
{
    public class UserController : ApiControllerBase
    {

        public UserController(IMediator mediator) : base(mediator) { }

        public async Task<IActionResult> Register([FromBody] CreateUserCommand command)
        {
            await CommandAsync(command);
            return Ok();
        }
    }
}

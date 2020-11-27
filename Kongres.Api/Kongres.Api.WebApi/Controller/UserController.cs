using System;
using System.Threading.Tasks;
using Kongres.Api.Application.Commands.Users;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Kongres.Api.WebApi.Controller
{
    public class UserController : ApiControllerBase
    {

        public UserController(IMediator mediator) : base(mediator) { }

        // api/User/Register
        [HttpPost("Register")]
        public async Task<IActionResult> Register([FromBody] CreateUserCommand command)
        {
            await CommandAsync(command);
            return Ok();
        }

        // api/User/LoginParticipant
        [HttpPost("LoginParticipant")]
        public async Task<IActionResult> LoginParticipant([FromBody] LoginParticipantCommand command)
        {
            try
            {
                await CommandAsync(command);
            }
            catch (Exception e)
            {
                return NotFound(e.Message);
            }

            return Ok();
        }

        // api/User/LoginReviewer
        [HttpPost("LoginReviewer")]
        public async Task<IActionResult> LoginReviewer([FromBody] LoginReviewerCommand command)
        {
            try
            {
                await CommandAsync(command);
            }
            catch (Exception e)
            {
                return NotFound(e.Message);
            }

            await CommandAsync(command);
            return Ok();
        }
    }
}

using Kongres.Api.Application.Commands.Reviewer;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace Kongres.Api.WebApi.Controller
{
    public class ReviewerController : ApiControllerBase
    {
        public ReviewerController(IMediator mediator) : base(mediator) { }

        // api/Reviewer/Register
        [HttpPost("Register")]
        public async Task<IActionResult> Register([FromForm] CreateReviewerCommand command)
        {
            await CommandAsync(command);
            return Ok();
        }

        // api/Reviewer/Login
        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody] LoginReviewerCommand command)
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
    }
}

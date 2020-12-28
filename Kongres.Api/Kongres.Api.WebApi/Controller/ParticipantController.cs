using System;
using System.Threading.Tasks;
using Kongres.Api.Application.Commands.Participant;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Kongres.Api.WebApi.Controller
{
    public class ParticipantController : ApiControllerBase
    {
        public ParticipantController(IMediator mediator) : base(mediator) { }

        // api/Participant/Register
        [HttpPost("Register")]
        public async Task<IActionResult> Register([FromBody] CreateParticipantCommand command)
        {
            await CommandAsync(command);
            return Ok();
        }

        // api/Participant/Login
        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody] LoginParticipantCommand command)
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

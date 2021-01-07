using System;
using System.Threading.Tasks;
using Kongres.Api.Application.Commands.Participant;
using Kongres.Api.Domain.Extensions;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;

namespace Kongres.Api.WebApi.Controller
{
    public class ParticipantController : ApiControllerBase
    {
        private readonly IMemoryCache _cache;
        public ParticipantController(IMediator mediator, IMemoryCache cache) : base(mediator)
        {
            _cache = cache;
        }

        // api/Participant/Register
        [HttpPost("Register")]
        public async Task<IActionResult> Register([FromForm] CreateParticipantCommand command)
        {
            await CommandAsync(command);
            return Ok();
        }

        // api/Participant/Login
        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody] LoginParticipantCommand command)
        {
            command.TokenId = Guid.NewGuid();
            try
            {
                await CommandAsync(command);
            }
            catch (Exception e)
            {
                return NotFound(e.Message);
            }

            var token = _cache.GetJwt(command.TokenId);
            return Ok(token);
        }
    }
}

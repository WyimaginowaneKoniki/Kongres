﻿using System;
using System.Security.Authentication;
using System.Threading.Tasks;
using Kongres.Api.Application.Commands.Users.Participant;
using Kongres.Api.Application.Queries.Users;
using Kongres.Api.Domain.Extensions;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;

namespace Kongres.Api.WebApi.Controller
{
    [Route("api/participants")]
    public class ParticipantsController : ApiControllerBase
    {
        private readonly IMemoryCache _cache;
        public ParticipantsController(IMediator mediator, IMemoryCache cache) : base(mediator)
        {
            _cache = cache;
        }

        // POST /api/participants/register
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromForm] CreateParticipantCommand command)
        {
            await CommandAsync(command);
            return Ok();
        }

        // POST /api/participants/login
        [HttpPost("login")]
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

        // GET /api/participants/work-info
        [Authorize]
        [HttpGet("work-info")]
        public async Task<IActionResult> GetWorkInfo()
        {
            var command = new GetInfoForAddWorkQuery
            {
                UserId = HttpContext.User.Identity.Name
            };

            string userName;

            try
            {
                userName = await CommandAsync(command);
            }
            catch (AuthenticationException)
            {
                return Unauthorized();
            }
            catch (InvalidOperationException)
            {
                return BadRequest();
            }

            return Ok(userName);
        }
    }
}

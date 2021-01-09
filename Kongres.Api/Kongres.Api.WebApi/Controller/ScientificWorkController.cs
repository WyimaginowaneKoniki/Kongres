﻿using Kongres.Api.Application.Commands.Work;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Kongres.Api.WebApi.Controller
{
    public class ScientificWorkController : ApiControllerBase
    {
        public ScientificWorkController(IMediator mediator) : base(mediator)
        { }

        [Authorize]
        [HttpPost("AddWork")]
        public async Task<IActionResult> AddWork([FromForm] AddWorkCommand command)
        {
            command.AuthorId = HttpContext.User.Identity.Name;
            await CommandAsync(command);
            return Ok();
        }
    }
}
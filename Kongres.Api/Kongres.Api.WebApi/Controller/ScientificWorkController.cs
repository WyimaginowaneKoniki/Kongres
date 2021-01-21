using System;
using Kongres.Api.Application.Commands.Work;
using Kongres.Api.Application.Queries.Work;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Authentication;
using System.Threading.Tasks;
using Kongres.Api.Domain.DTOs;

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

            uint id;
            try
            {
                id = await CommandAsync(command);
            }
            catch (AuthenticationException)
            {
                return Unauthorized();
            }
            catch (InvalidOperationException)
            {
                return BadRequest();
            }

            return Created("ScientificWork/", new { ScientificWorkId = id });
        }

        [Authorize]
        [HttpPost("AddVersion")]
        public async Task<IActionResult> AddVersion([FromForm] AddVersionCommand command)
        {
            command.UserId = HttpContext.User.Identity.Name;
            await CommandAsync(command);
            return Ok();
        }

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetAll([FromBody] GetApprovedWorksQuery query)
            => Ok(await CommandAsync(query));

        [Authorize]
        [HttpGet("{ScientificWorkId}")]
        public async Task<IActionResult> GetById([FromHeader] GetWorkQuery query)
        {
            query.UserId = uint.Parse(HttpContext.User.Identity.Name ?? "0");
            ScientificWorkWithReviewDto scientificWork;

            try
            {
                scientificWork = await CommandAsync(query);
            }
            catch (AuthenticationException)
            {
                return Unauthorized();
            }

            return Ok(scientificWork);
        }

        [Authorize]
        [HttpGet("Download/{WorkId}")]
        public async Task<IActionResult> Download([FromHeader] DownloadScientificWorkQuery query)
        {
            var fileStream = await CommandAsync(query);

            if (fileStream is null)
                return NotFound("Could not find scientific work with given Id.");

            return File(fileStream, "application/pdf");
        }
    }
}

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
    [Route("api/scientific-works")]
    public class ScientificWorksController : ApiControllerBase
    {
        public ScientificWorksController(IMediator mediator) : base(mediator)
        { }

        // POST /api/scientific-works
        [Authorize]
        [HttpPost]
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

            return Created("scientific-works/", new { ScientificWorkId = id });
        }

        // POST /api/scientific-works/version
        [Authorize]
        [HttpPost("version")]
        public async Task<IActionResult> AddVersion([FromForm] AddVersionCommand command)
        {
            command.UserId = HttpContext.User.Identity.Name;
            await CommandAsync(command);
            return Ok();
        }

        // GET  /api/scientific-works
        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetAll()
            => Ok(await CommandAsync(new GetApprovedWorksQuery()));

        // GET /api/scientific-works/{scientificWorkId}
        [Authorize]
        [HttpGet("{scientificWorkId}")]
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


        // GET /api/scientific-works/{scinetificWorkId}/download
        [Authorize]
        [HttpGet("{ScientificWorkId}/download")]
        public async Task<IActionResult> Download([FromHeader] DownloadScientificWorkQuery query)
        {
            var fileStream = await CommandAsync(query);

            if (fileStream is null)
                return NotFound("Could not find scientific work with given Id.");

            return File(fileStream, "application/pdf");
        }
    }
}

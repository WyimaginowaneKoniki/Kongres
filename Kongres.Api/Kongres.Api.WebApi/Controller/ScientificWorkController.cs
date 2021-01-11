using Kongres.Api.Application.Commands.Work;
using Kongres.Api.Application.Queries.Work;
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

        // [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetAll()
            => Ok(await CommandAsync(new GetApprovedWorksQuery()));

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

using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Kongres.Api.Application.Commands.Review;
using Kongres.Api.Application.Queries.Review;

namespace Kongres.Api.WebApi.Controller
{
    public class ReviewController : ApiControllerBase
    {
        public ReviewController(IMediator mediator) : base(mediator)
        { }


        [Authorize]
        [HttpPost("AddAnswer")]
        public async Task<IActionResult> AddAnswerToReview([FromForm] AddAnswerToReviewCommand command)
        {
            command.UserId = HttpContext.User.Identity.Name;
            await CommandAsync(command);
            return Ok();
        }

        [Authorize]
        [HttpPost("AddReview")]
        public async Task<IActionResult> AddReview([FromForm] AddReviewCommand command)
        {
            command.UserId = HttpContext.User.Identity.Name;
            await CommandAsync(command);
            return Ok();
        }

        [Authorize]
        [HttpGet("Download/{ReviewId}")]
        public async Task<IActionResult> Download([FromHeader] DownloadReviewFileQuery query)
        {
            query.UserId = HttpContext.User.Identity.Name;

            var fileStream = await CommandAsync(query);

            if (fileStream is null)
                return NotFound("Could not find review file with given Id.");

            return File(fileStream, "application/pdf");
        }
    }
}

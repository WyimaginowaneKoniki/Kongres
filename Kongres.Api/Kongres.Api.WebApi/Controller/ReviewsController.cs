using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Kongres.Api.Application.Commands.Review;
using Kongres.Api.Application.Queries.Review;

namespace Kongres.Api.WebApi.Controller
{

    [Route("api/reviews")]
    public class ReviewsController : ApiControllerBase
    {
        public ReviewsController(IMediator mediator) : base(mediator)
        { }

        // POST /api/reviews/answer
        [Authorize]
        [HttpPost("answer")]
        public async Task<IActionResult> AddAnswer([FromForm] AddAnswerToReviewCommand command)
        {
            command.UserId = HttpContext.User.Identity.Name;
            await CommandAsync(command);
            return Ok();
        }


        // POST /api/reviews
        [Authorize]
        [HttpPost]
        public async Task<IActionResult> AddReview([FromForm] AddReviewCommand command)
        {
            command.UserId = HttpContext.User.Identity.Name;
            await CommandAsync(command);
            return Ok();
        }

        // GET /api/reviews/download/{reviewId:int}
        [Authorize]
        [HttpGet("download/{reviewId}")]
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

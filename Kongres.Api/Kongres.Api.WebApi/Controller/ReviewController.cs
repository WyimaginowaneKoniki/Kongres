using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Kongres.Api.Application.Commands.Review;

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
    }
}

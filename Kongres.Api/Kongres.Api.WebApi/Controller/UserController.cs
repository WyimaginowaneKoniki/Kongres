using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Kongres.Api.Application.Queries.Users;

namespace Kongres.Api.WebApi.Controller
{
    public class UserController : ApiControllerBase
    {
        public UserController(IMediator mediator) : base(mediator)
        { }

        [HttpGet("Confirm")]
        public async Task<IActionResult> ConfirmAccount([FromQuery] ConfirmUserQuery query)
        {
            await CommandAsync(query);
            return Ok();
        }
    }
}

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

        [HttpPost("Confirm")]
        public async Task<IActionResult> ConfirmAccount([FromBody] ConfirmUserQuery query)
        {
            await CommandAsync(query);
            return Ok();
        }
    }
}

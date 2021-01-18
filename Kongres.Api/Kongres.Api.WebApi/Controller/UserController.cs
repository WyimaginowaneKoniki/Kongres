using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Kongres.Api.Application.Queries.Users;
using Microsoft.AspNetCore.Authorization;

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

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetBasicInfo()
        {
            var query = new GetBasicUserInfoQuery()
            {
                UserId = HttpContext.User.Identity.Name
            };
            var userInfo = await CommandAsync(query);
            return Ok(userInfo);
        }
    }
}

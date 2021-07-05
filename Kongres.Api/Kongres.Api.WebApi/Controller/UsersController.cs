using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Kongres.Api.Application.Queries.Users;
using Microsoft.AspNetCore.Authorization;

namespace Kongres.Api.WebApi.Controller
{
    [Route("api/users")]
    public class UsersController : ApiControllerBase
    {
        public UsersController(IMediator mediator) : base(mediator)
        { }

        // POST /api/users/confirm
        [HttpPost("confirm")]
        public async Task<IActionResult> ConfirmAccount([FromBody] ConfirmUserQuery query)
        {
            await CommandAsync(query);
            return Ok();
        }

        // GET /api/users
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

        // GET /api/users/profile
        [Authorize]
        [HttpGet("profile")]
        public async Task<IActionResult> GetInformationForMyProfile()
        {
            var query = new GetInformationForMyProfileQuery()
            {
                UserId = HttpContext.User.Identity.Name
            };
            var userInfo = await CommandAsync(query);
            return Ok(userInfo);
        }
    }
}

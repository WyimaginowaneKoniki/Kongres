using System.Threading.Tasks;
using Kongres.Api.Application.Queries.Users;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Kongres.Api.WebApi.Controller
{
    public class UserController : ApiControllerBase
    {
        public UserController(IMediator mediator) : base(mediator)
        { }

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

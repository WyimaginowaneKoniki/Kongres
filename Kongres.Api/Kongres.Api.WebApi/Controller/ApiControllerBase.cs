using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Kongres.Api.WebApi.Controller
{
    [ApiController]
    public class ApiControllerBase : ControllerBase
    {
        private readonly IMediator _mediator;

        protected ApiControllerBase(IMediator mediator)
        {
            _mediator = mediator;
        }

        protected async Task<TResult> CommandAsync<TResult>(IRequest<TResult> request)
            => await _mediator.Send(request);
    }
}

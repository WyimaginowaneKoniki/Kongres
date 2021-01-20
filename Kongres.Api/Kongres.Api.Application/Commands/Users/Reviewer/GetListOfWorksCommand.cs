using Kongres.Api.Domain.DTOs;
using MediatR;
using System.Collections.Generic;

namespace Kongres.Api.Application.Commands.Users.Reviewer
{
    public class GetListOfWorksCommand : IRequest<IEnumerable<ScientificWorkWithStatusDto>>
    {
        public string ReviewerId { get; set; }
    }
}

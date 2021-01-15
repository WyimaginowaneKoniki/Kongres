using Kongres.Api.Domain.DTOs;
using MediatR;
using System.Collections.Generic;

namespace Kongres.Api.Application.Queries.Work
{
    public class GetApprovedWorksQuery : IRequest<IEnumerable<ScientificWorkDto>>
    { }
}

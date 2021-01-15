using Kongres.Api.Domain.DTOs;
using MediatR;

namespace Kongres.Api.Application.Queries.Work
{
    public class GetWorkQuery : IRequest<ScientificWorkWithReviewDto>
    {
        public uint ScientificWorkId { get; set; }
        public uint UserId { get; set; }
    }
}

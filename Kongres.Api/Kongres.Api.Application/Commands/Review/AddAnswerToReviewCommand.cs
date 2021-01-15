using MediatR;

namespace Kongres.Api.Application.Commands.Review
{
    public class AddAnswerToReviewCommand: IRequest
    {
        public string UserId { get; set; }
        public uint ReviewId { get; set; }
        public string Answer { get; set; }
    }
}

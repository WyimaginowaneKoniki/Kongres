using Kongres.Api.Application.Commands.Review;
using Kongres.Api.Application.Services.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace Kongres.Api.Application.Handlers.Review
{
    public class AddAnswerToReviewHandler : AsyncRequestHandler<AddAnswerToReviewCommand>
    {
        private readonly IReviewService _reviewService;

        public AddAnswerToReviewHandler(IReviewService reviewService)
        {
            _reviewService = reviewService;
        }

        protected override async Task Handle(AddAnswerToReviewCommand request, CancellationToken cancellationToken)
        {
            var userId = uint.Parse(request.UserId);
            await _reviewService.AddAnswerToReviewAsync(userId, request.ReviewId, request.Answer);
        }
    }
}

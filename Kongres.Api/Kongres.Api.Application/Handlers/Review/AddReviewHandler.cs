using Kongres.Api.Application.Commands.Review;
using Kongres.Api.Application.Services.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace Kongres.Api.Application.Handlers.Review
{
    public class AddReviewHandler : AsyncRequestHandler<AddReviewCommand>
    {
        private readonly IReviewService _reviewService;

        public AddReviewHandler(IReviewService reviewService)
        {
            _reviewService = reviewService;
        }

        protected override async Task Handle(AddReviewCommand request, CancellationToken cancellationToken)
        {
            var userId = uint.Parse(request.UserId);
            await _reviewService.AddReviewAsync(userId,
                                                request.ReviewMsg,
                                                request.ReviewFile,
                                                request.Rating,
                                                request.ScientificWorkId);
        }
    }
}

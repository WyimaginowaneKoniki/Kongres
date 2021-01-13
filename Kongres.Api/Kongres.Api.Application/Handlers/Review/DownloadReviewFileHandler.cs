using Kongres.Api.Application.Queries.Review;
using Kongres.Api.Application.Services.Interfaces;
using MediatR;
using System.IO;
using System.Threading;
using System.Threading.Tasks;

namespace Kongres.Api.Application.Handlers.Review
{
    public class DownloadReviewFileHandler : IRequestHandler<DownloadReviewFileQuery, Stream>
    {
        private readonly IReviewService _reviewService;

        public DownloadReviewFileHandler(IReviewService reviewService)
        {
            _reviewService = reviewService;
        }

        public async Task<Stream> Handle(DownloadReviewFileQuery request, CancellationToken cancellationToken)
        {
            var userId = uint.Parse(request.UserId);
            return await _reviewService.GetStreamOfReviewFileAsync(userId, request.ReviewId);
        }
    }
}

﻿using System.Threading.Tasks;

namespace Kongres.Api.Application.Services.Interfaces
{
    public interface IReviewService : IService
    {
        Task AddAnswerToReviewAsync(uint userId, uint reviewId, string answerMsg);
    }
}

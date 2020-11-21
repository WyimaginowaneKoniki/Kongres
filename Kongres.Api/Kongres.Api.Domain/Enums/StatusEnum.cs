using System;

namespace Kongres.Api.Domain.Enums
{
    public enum StatusEnum : byte
    {
        WaitingForReview,
        ToCorrect,
        Accepted,
        Rejected
    }
}
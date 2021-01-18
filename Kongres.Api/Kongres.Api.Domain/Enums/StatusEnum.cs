namespace Kongres.Api.Domain.Enums
{
    public enum StatusEnum : byte
    {
        WaitingForDrawOfReviewers,
        UnderReview,
        Correcting,
        Rejected,
        Accepted
    }
}
namespace Kongres.Api.Domain.DTOs
{
    public class ReviewDto
    {
        public uint Id { get; set; }
        public string ReviewDate { get; set; }
        public uint Rating { get; set; }
        public string ReviewMsg { get; set; }
        public bool IsReviewFileExist { get; set; }

        public string AnswerMsg { get; set; }
        public string AnswerDate { get; set; }
    }
}

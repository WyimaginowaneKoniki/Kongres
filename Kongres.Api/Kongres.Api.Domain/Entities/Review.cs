using System;

namespace Kongres.Api.Domain.Entities
{
    public class Review
    {
        public uint Id { get; set; }
        public ReviewersScienceWork ReviewersScienceWork { get; set; }
        public string Comment { get; set; }
        public string File { get; set; }
        public DateTime DateReview { get; set; }
        public byte Rating { get; set; }
    }
}
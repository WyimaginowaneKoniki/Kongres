using System;

namespace Kongres.Api.Domain.Entities
{
    public class Answer
    {
        public uint Id { get; set; }
        public User User { get; set; }
        public string Comment { get; set; }
        public string File { get; set; }
        public DateTime AnswerDate { get; set; }
    }
}

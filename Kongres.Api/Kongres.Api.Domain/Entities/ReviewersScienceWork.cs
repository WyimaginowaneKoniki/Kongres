using System;

namespace Kongres.Api.Domain.Entities
{
    public class ReviewersScienceWork
    {
        public uint Id { get; set; }
        public User User {get; set;}
        public ScienceWork ScienceWork {get; set;}
    }
}
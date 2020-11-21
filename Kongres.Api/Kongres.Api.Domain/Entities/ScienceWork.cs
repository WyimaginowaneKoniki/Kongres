using System;
using Kongres.Api.Domain.Enums;

namespace Kongres.Api.Domain.Entities
{
    public class ScienceWork
    {
        public uint Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public User MainAuthor { get; set; }
        public string OtherAuthors { get; set; }
        public DateTime CreationDate { get; set; }
        public StatusEnum Status { get; set; }
    }
}
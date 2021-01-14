using Kongres.Api.Domain.Enums;
using System;
using System.Collections.Generic;

namespace Kongres.Api.Domain.Entities
{
    public class ScientificWork
    {
        public uint Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public User MainAuthor { get; set; }
        public string OtherAuthors { get; set; }
        public DateTime CreationDate { get; set; }
        public string Specialization { get; set; }
        public StatusEnum Status { get; set; }
        public IEnumerable<ScientificWorkFile> Versions { get; set; }
    }
}
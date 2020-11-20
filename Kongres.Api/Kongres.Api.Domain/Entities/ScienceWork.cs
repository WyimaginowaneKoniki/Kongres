using System;
using Kongres.Api.Domain.Enums;

namespace Kongres.Api.Domain.Entities
{
    public class ScienceWork
    {
        public uint Id { get; set; }
        public string ThesisName { get; set; }
        public User Author { get; set; }
        public DateTime CreationDate { get; set; }
        public StatusEnum Status { get; set; }
    }
}
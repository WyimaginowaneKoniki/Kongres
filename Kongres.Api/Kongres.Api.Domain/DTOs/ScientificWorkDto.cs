using System;

namespace Kongres.Api.Domain.DTOs
{
    public class ScientificWorkDto
    {
        public uint Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime CreationDate { get; set; }
        public DateTime UpdateDate { get; set; }
        public string Specialization { get; set; }
        public string Authors { get; set; }
    }
}

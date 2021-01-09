using System;

namespace Kongres.Api.Domain.Entities
{
    public class ScientificWorkFile
    {
        public uint Id { get; set; }
        public string FileName { get; set; }
        public byte Version { get; set; }
        public DateTime DateAdd { get; set; }
        public ScientificWork ScientificWork { get; set; }
    }
}
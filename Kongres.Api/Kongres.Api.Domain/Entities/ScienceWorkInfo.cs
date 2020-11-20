using System;

namespace Kongres.Api.Domain.Entities
{
    public class ScienceWorkInfo
    {
        public uint Id { get; set; }
        public string FileName { get; set; }
        public uint Version { get; set; }
        public DateTime DateAdd { get; set; }
        public ScienceWork ScienceWork { get; set; }
    }
}
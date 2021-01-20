using System.Collections.Generic;

namespace Kongres.Api.Domain.DTOs
{
    public class VersionDto
    {
        public uint VersionNumber { get; set; }
        public string Date { get; set; }
        public IEnumerable<ReviewDto> Reviews { get; set; }
        public byte Rating { get; set; }
    }
}

using System.Collections.Generic;

namespace Kongres.Api.Domain.DTOs
{
    public class ScientificWorkWithReviewDto
    {
        public ScientificWorkDto ScientificWork { get; set; }
        public UserDto MainAuthor { get; set; }
        public string Mode { get; set; }
        public IEnumerable<VersionDto> Versions { get; set; }
        public string Status { get; set; }
    }
}

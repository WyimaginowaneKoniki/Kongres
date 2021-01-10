using System;

namespace Kongres.Api.Domain.DTOs
{
    public class ScientificWorkWithReviewDto
    {
        public ScientificWorkDto ScientificWork { get; set; }
        public UserDto MainAuthor { get; set; }
    }
}

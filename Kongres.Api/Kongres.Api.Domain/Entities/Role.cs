using System.Collections.Generic;
using Kongres.Api.Domain.Enums;

namespace Kongres.Api.Domain.Entities
{
    public class Role
    {
        public uint Id { get; set; }
        public string Name { get; set; }
        public string NormalizedName { get; set; }
    }
}

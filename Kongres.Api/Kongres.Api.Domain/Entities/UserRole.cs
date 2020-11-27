using Kongres.Api.Domain.Enums;

namespace Kongres.Api.Domain.Entities
{
    public class UserRole
    {
        public uint Id { get; set; }
        public User User { get; set; }
        public UserTypeEnum Type { get; set; }
    }
}

namespace Kongres.Api.Domain.Entities
{
    public class UserRole
    {
        public uint Id { get; set; }
        public User User { get; set; }
        public Role Role { get; set; }
    }
}

namespace Kongres.Api.Domain.Entities
{
    public class User
    {
        public uint Id { get; set; }
        public string PasswordHash { get; set; }
        public string Name { get; set; }
        public string UserName { get; set; }
        public string NormalizedUserName { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }
        public string NormalizedEmail { get; set; }
        public string Specialization { get; set; }
        public string University { get; set; }
        public string Degree { get; set; }
        public string Photo { get; set; }
        public bool IsEmailConfirmed { get; set; }
    }
}
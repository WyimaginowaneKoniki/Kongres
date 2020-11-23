using System;
using Kongres.Api.Domain.Enums;

namespace Kongres.Api.Domain.Entities
{
    public class User
    {
        public uint Id { get; set; }
        public string Password { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }
        public string Specialization { get; set; }
        public string University { get; set; }
        public string Degree { get; set; }
        public string Photo { get; set; }
        public UserTypeEnum UserType { get; set; }
    }
}
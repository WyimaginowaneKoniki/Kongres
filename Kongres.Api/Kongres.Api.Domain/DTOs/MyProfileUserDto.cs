namespace Kongres.Api.Domain.DTOs
{
    public class MyProfileUserDto
    {
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }
        public string AcademicTitle { get; set; }
        public string University { get; set; }
        public string Specialization { get; set; }
        public string PhotoBase64 { get; set; }
        public string Role { get; set; }
    }
}

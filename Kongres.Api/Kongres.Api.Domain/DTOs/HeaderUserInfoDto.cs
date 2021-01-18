namespace Kongres.Api.Domain.DTOs
{
    public class HeaderUserInfoDto
    {
        public string Name { get; set; }
        public uint ScientificWorkId { get; set; }
        public string PhotoBase64 { get; set; }
        public string Role { get; set; }
    }
}

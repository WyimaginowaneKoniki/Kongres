namespace Kongres.Api.Domain.Settings
{
    public class JwtSettings
    {
        public string Issuer { get; set; }
        public string Audience { get; set; }
        public string Secret { get; set; }
        public uint MinutesToExpire { get; set; }
    }
}

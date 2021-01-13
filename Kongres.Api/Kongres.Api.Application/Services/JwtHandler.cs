using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Kongres.Api.Application.Services.Interfaces;
using Kongres.Api.Domain.Settings;
using Microsoft.IdentityModel.Tokens;

namespace Kongres.Api.Application.Services
{
    public class JwtHandler : IJwtHandler
    {
        private readonly JwtSettings _settings;

        public JwtHandler(JwtSettings settings)
        {
            _settings = settings;
        }

        public string CreateToken(uint userId, string role)
        {
            var now = DateTime.UtcNow;

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, userId.ToString()),
                new Claim(JwtRegisteredClaimNames.UniqueName, userId.ToString()),
                new Claim(ClaimTypes.Role, role),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            };

            var secretBytes = Encoding.UTF8.GetBytes(_settings.Secret);
            var key = new SymmetricSecurityKey(secretBytes);
            var signingCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature);

            var expires = now.AddMinutes(_settings.MinutesToExpire);

            var token = new JwtSecurityToken(_settings.Issuer, _settings.Audience, claims, now, expires, signingCredentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}

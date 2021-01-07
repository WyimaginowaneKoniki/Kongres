namespace Kongres.Api.Application.Services
{
    public interface IJwtHandler
    {
        string CreateToken(uint userId, string role);
    }
}

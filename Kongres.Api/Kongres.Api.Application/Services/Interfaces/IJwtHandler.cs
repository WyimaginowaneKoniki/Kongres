namespace Kongres.Api.Application.Services.Interfaces
{
    public interface IJwtHandler
    {
        string CreateToken(uint userId, string role);
    }
}

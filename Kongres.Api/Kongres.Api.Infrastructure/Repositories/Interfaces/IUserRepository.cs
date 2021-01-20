namespace Kongres.Api.Infrastructure.Repositories.Interfaces
{
    public interface IUserRepository : IRepository
    {
        string GetEmailById(uint id);
    }
}

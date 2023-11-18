using NoshMazandaran.Entities;

namespace NoshMazandaran.Data.Reositories
{
    public interface IUserRepository:IRepository<User>
    {
        Task AddAsync(User user, string password, CancellationToken cancellationToken);
        Task<User> GetByUserAndPass(string username, string password, CancellationToken cancellationToken);
    }
}
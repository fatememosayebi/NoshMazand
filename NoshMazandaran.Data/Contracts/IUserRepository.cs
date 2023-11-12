using NoshMazandaran.Entities;

namespace NoshMazandaran.Data.Reositories
{
    public interface IUserRepository:IRepository<User>
    {
        Task AddAsync(User user, string password, CancellationToken cancellationToken);
    }
}
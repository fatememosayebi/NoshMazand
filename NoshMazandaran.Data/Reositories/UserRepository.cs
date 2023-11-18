using Diamond.Common.Utilities;
using Microsoft.EntityFrameworkCore;
using NoshMazandaran.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NoshMazandaran.Data.Reositories
{
    public class UserRepository : Repository<User>, IUserRepository
    {
        public UserRepository(Db dbContext)
            : base(dbContext)
        {
        }
        public async Task AddAsync(User user, string password, CancellationToken cancellationToken)
        {
            var passwordHash = SecurityHelper.GetSha256Hash(password);
            user.PasswordHash = passwordHash;
            await base.AddAsync(user, cancellationToken);
        }
        public Task<User> GetByUserAndPass(string username, string password, CancellationToken cancellationToken)
        {
            var passwordHash = SecurityHelper.GetSha256Hash(password);
            return Table.Where(p => p.UserName == username && p.PasswordHash == passwordHash).SingleOrDefaultAsync(cancellationToken);
        }
    }
}


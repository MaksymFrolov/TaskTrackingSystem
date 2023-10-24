using System.Linq.Expressions;
using DataAccessLayer.Entities;
using DataAccessLayer.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DataAccessLayer.DataBase.Repositories;

public class UserRepository : GenericRepository<User>, IUserRepository
{
    public UserRepository(TaskDbContext dbContext) : base(dbContext)
    {
    }

    public async Task<IReadOnlyCollection<User>> GetAllByExpressionAsync(Expression<Func<User, bool>> expression, CancellationToken cancellationToken)
    {
        return await _dbSet
            .Where(expression)
            .ToListAsync(cancellationToken);
    }
}
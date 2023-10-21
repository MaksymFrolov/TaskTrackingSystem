using System.Linq.Expressions;
using DataAccessLayer.Entities;

namespace DataAccessLayer.Interfaces;

public interface IUserRepository : IRepository<User>
{
   Task<IReadOnlyCollection<User>> GetAllByExpressionAsync(Expression<Func<User, bool>> expression, CancellationToken cancellationToken);
}
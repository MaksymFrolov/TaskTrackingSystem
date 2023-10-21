using DataAccessLayer.Entities;
using DataAccessLayer.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DataAccessLayer.DataBase.Repositories
{
    /// <summary>
    ///   Implements a userProjectRepository
    /// </summary>
    public class UserProjectRepository1 : GenericRepository1<UserProject>, IUserProjectRepository1
    {
        /// <summary>Initializes a new instance of the <see cref="UserProjectRepository1" /> class.</summary>
        /// <param name="dbContext">The database context.</param>
        public UserProjectRepository1(TaskDbContext dbContext) : base(dbContext)
        {

        }

        /// <summary>Gets all userprojects with details asynchronous.</summary>
        /// <returns>UserProjects</returns>
        public async Task<IEnumerable<UserProject>> GetAllWithDetailsAsync()
        {
            return await dbContext.UserProjects
                .Include(t => t.Task.Manager)
                .Include(t => t.Task.Status)
                .Include(t => t.User)
                .Include(t => t.Position)
                .Include(t => t.Task.Project.Status)
                .ToListAsync();
        }
    }
}

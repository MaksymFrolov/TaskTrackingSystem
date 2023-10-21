using DataAccessLayer.Entities;
using DataAccessLayer.Interfaces;

namespace DataAccessLayer.DataBase.Repositories
{
    /// <summary>
    ///   Implements a projectStatusRepository
    /// </summary>
    public class ProjectStatusRepository1 : GenericRepository1<ProjectStatus>, IProjectStatusRepository1
    {
        /// <summary>Initializes a new instance of the <see cref="ProjectStatusRepository1" /> class.</summary>
        /// <param name="dbContext">The database context.</param>
        public ProjectStatusRepository1(TaskDbContext dbContext) : base(dbContext)
        {

        }
    }
}

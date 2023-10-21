using DataAccessLayer.Entities;
using DataAccessLayer.Interfaces;

namespace DataAccessLayer.DataBase.Repositories
{
    /// <summary>
    ///   Implements an assignmentStatusRepository
    /// </summary>
    public class AssignmentStatusRepository1 : GenericRepository1<AssignmentStatus>, IAssignmentStatusRepository1
    {
        /// <summary>Initializes a new instance of the <see cref="AssignmentStatusRepository1" /> class.</summary>
        /// <param name="dbContext">The database context.</param>
        public AssignmentStatusRepository1(TaskDbContext dbContext) : base(dbContext)
        {

        }
    }
}

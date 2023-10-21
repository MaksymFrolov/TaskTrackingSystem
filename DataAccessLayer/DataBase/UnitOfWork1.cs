using DataAccessLayer.DataBase.Repositories;
using DataAccessLayer.Interfaces;

namespace DataAccessLayer.DataBase
{
    /// <summary>
    ///   Implements an unit of work
    /// </summary>
    public class UnitOfWork1 : IUnitOfWork1
    {
        readonly TaskDbContext dbContext;

        AssignmentRepository1 _assignmentRepository1;

        AssignmentStatusRepository1 _assignmentStatusRepository1;

        PositionRepository1 _positionRepository1;

        ProjectRepository1 _projectRepository1;

        ProjectStatusRepository1 _projectStatusRepository1;

        UserProjectRepository1 _userProjectRepository1;

        /// <summary>Initializes a new instance of the <see cref="UnitOfWork1" /> class.</summary>
        /// <param name="dbContext">The database context.</param>
        public UnitOfWork1(TaskDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        /// <summary>Gets the assignment repository.</summary>
        /// <value>The assignment repository.</value>
        public IAssignmentRepository1 AssignmentRepository1 => _assignmentRepository1 ??= new(dbContext);

        /// <summary>Gets the assignment status repository.</summary>
        /// <value>The assignment status repository.</value>
        public IAssignmentStatusRepository1 AssignmentStatusRepository1 => _assignmentStatusRepository1 ??= new(dbContext);

        /// <summary>Gets the position repository.</summary>
        /// <value>The position repository.</value>
        public IPositionRepository1 PositionRepository1 => _positionRepository1 ??= new(dbContext);

        /// <summary>Gets the project repository.</summary>
        /// <value>The project repository.</value>
        public IProjectRepository1 ProjectRepository1 => _projectRepository1 ??= new(dbContext);

        /// <summary>Gets the project status repository.</summary>
        /// <value>The project status repository.</value>
        public IProjectStatusRepository1 ProjectStatusRepository1 => _projectStatusRepository1 ??= new(dbContext);

        /// <summary>Gets the user project repository.</summary>
        /// <value>The user project repository.</value>
        public IUserProjectRepository1 UserProjectRepository1 => _userProjectRepository1 ??= new(dbContext);

        /// <summary>Saves asynchronous.</summary>
        public async Task SaveAsync()
        {
            await dbContext.SaveChangesAsync();
        }
    }
}

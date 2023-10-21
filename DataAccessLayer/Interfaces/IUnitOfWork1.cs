namespace DataAccessLayer.Interfaces
{
    /// <summary>
    ///   Describes an unit of work
    /// </summary>
    public interface IUnitOfWork1
    {
        /// <summary>Gets the assignment repository.</summary>
        /// <value>The assignment repository.</value>
        IAssignmentRepository1 AssignmentRepository1 { get; }

        /// <summary>Gets the assignment status repository.</summary>
        /// <value>The assignment status repository.</value>
        IAssignmentStatusRepository1 AssignmentStatusRepository1 { get; }

        /// <summary>Gets the position repository.</summary>
        /// <value>The position repository.</value>
        IPositionRepository1 PositionRepository1 { get; }

        /// <summary>Gets the project repository.</summary>
        /// <value>The project repository.</value>
        IProjectRepository1 ProjectRepository1 { get; }

        /// <summary>Gets the project status repository.</summary>
        /// <value>The project status repository.</value>
        IProjectStatusRepository1 ProjectStatusRepository1 { get; }

        /// <summary>Gets the user project repository.</summary>
        /// <value>The user project repository.</value>
        IUserProjectRepository1 UserProjectRepository1 { get; }

        /// <summary>Saves asynchronous.</summary>
        Task SaveAsync();
    }
}

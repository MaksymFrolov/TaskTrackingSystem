using DataAccessLayer.Entities;

namespace DataAccessLayer.Interfaces
{
    /// <summary>
    ///   Describes an user project repository
    /// </summary>
    public interface IUserProjectRepository1 : IRepository1<UserProject>
    {
        /// <summary>Gets all userprojects with details asynchronous.</summary>
        /// <returns>
        ///   UserProjects
        /// </returns>
        Task<IEnumerable<UserProject>> GetAllWithDetailsAsync();
    }
}

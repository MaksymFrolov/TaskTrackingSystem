using DataAccessLayer.Entities;

namespace DataAccessLayer.Interfaces;

public interface IProjectRepository : IRepository<Project>
{
    Task<IReadOnlyCollection<Project>> GetAllWithDetailsAsync(CancellationToken cancellationToken);

    Task<Project> GetByIdWithDetailsAsync(int id, CancellationToken cancellationToken);
}
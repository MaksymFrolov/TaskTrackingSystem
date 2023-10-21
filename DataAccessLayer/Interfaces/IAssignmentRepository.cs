using DataAccessLayer.Entities;

namespace DataAccessLayer.Interfaces;

public interface IAssignmentRepository : IRepository<Assignment>
{
    Task<IReadOnlyCollection<Assignment>> GetAllWithDetailsAsync(CancellationToken cancellationToken);
    
    Task<Assignment> GetByIdWithDetailsAsync(int id, CancellationToken cancellationToken);
}
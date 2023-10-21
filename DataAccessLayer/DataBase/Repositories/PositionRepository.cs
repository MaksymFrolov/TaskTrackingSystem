using DataAccessLayer.Entities;
using DataAccessLayer.Interfaces;

namespace DataAccessLayer.DataBase.Repositories;

public class PositionRepository : GenericRepository<Position>, IPositionRepository
{
    public PositionRepository(TaskDbContext dbContext) : base(dbContext)
    {
    }
}
using DataAccessLayer.Entities;
using DataAccessLayer.Interfaces;

namespace DataAccessLayer.DataBase.Repositories
{
    /// <summary>
    ///   Implements a positionRepository
    /// </summary>
    public class PositionRepository1 : GenericRepository1<Position>, IPositionRepository1
    {
        /// <summary>Initializes a new instance of the <see cref="PositionRepository1" /> class.</summary>
        /// <param name="dbContext">The database context.</param>
        public PositionRepository1(TaskDbContext dbContext) : base(dbContext)
        {

        }
    }
}

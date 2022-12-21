using AutoMapper;
using BuisnessLogicLayer.Interfaces;
using BuisnessLogicLayer.Models;
using BuisnessLogicLayer.Validation;

namespace BuisnessLogicLayer.Services
{
    /// <summary>
    ///   Implements a userProjectService
    /// </summary>
    public class UserProjectService : IUserProjectService
    {
        readonly IUnitOfWork unitOfWork;

        readonly IMapper mapper;

        /// <summary>Initializes a new instance of the <see cref="UserProjectService" /> class.</summary>
        /// <param name="unitOfWork">The unit of work.</param>
        /// <param name="mapper">The mapper.</param>
        public UserProjectService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            this.unitOfWork = unitOfWork;
            this.mapper = mapper;
        }

        /// <summary>Adds the UserProjectModel asynchronous.</summary>
        /// <param name="model">The UserProjectModel.</param>
        public async Task AddAsync(UserProjectModel model)
        {
            ValidateUserProject(model);

            var userProject = mapper.Map<UserProject>(model);

            await unitOfWork.UserProjectRepository.AddAsync(userProject);

            await unitOfWork.SaveAsync();
        }

        /// <summary>Adds the user projects asynchronous.</summary>
        /// <param name="models">The models.</param>
        public async Task AddUserProjectsAsync(IEnumerable<UserProjectModel> models)
        {
            foreach (var model in models)
            {
                ValidateUserProject(model);

                var userProject = mapper.Map<UserProject>(model);

                await unitOfWork.UserProjectRepository.AddAsync(userProject);
            }

            await unitOfWork.SaveAsync();
        }

        /// <summary>Adds the position asynchronous.</summary>
        /// <param name="model">The model.</param>
        public async Task AddPositionAsync(PositionModel model)
        {
            ValidatePosition(model);

            var position = mapper.Map<Position>(model);

            await unitOfWork.PositionRepository.AddAsync(position);

            await unitOfWork.SaveAsync();
        }

        /// <summary>Deletes the userprojectmodel by id asynchronous.</summary>
        /// <param name="id">The identifier.</param>
        public async Task DeleteAsync(int id)
        {
            await unitOfWork.UserProjectRepository.DeleteByIdAsync(id);

            await unitOfWork.SaveAsync();
        }

        /// <summary>Deletes the user projects asynchronous.</summary>
        /// <param name="ids">The ids.</param>
        public async Task DeleteUserProjectsAsync(IEnumerable<int> ids)
        {
            foreach (var id in ids)
                await unitOfWork.UserProjectRepository.DeleteByIdAsync(id);

            await unitOfWork.SaveAsync();
        }

        /// <summary>Deletes the position asynchronous.</summary>
        /// <param name="id">The identifier.</param>
        public async Task DeletePositionAsync(int id)
        {
            await unitOfWork.PositionRepository.DeleteByIdAsync(id);

            await unitOfWork.SaveAsync();
        }

        /// <summary>Gets all userprojectmodels asynchronous.</summary>
        /// <returns>Models</returns>
        public async Task<IEnumerable<UserProjectModel>> GetAllAsync()
        {
            var list = await unitOfWork.UserProjectRepository.GetAllWithDetailsAsync();

            return mapper.Map<IEnumerable<UserProjectModel>>(list);
        }

        /// <summary>Gets all positions asynchronous.</summary>
        /// <returns>PositionModels</returns>
        public async Task<IEnumerable<PositionModel>> GetAllPositionsAsync()
        {
            var list = await unitOfWork.PositionRepository.GetAllAsync();

            return mapper.Map<IEnumerable<PositionModel>>(list);
        }

        /// <summary>Gets the userprojectmodel by identifier asynchronous.</summary>
        /// <param name="id">The identifier.</param>
        /// <returns>Model</returns>
        public async Task<UserProjectModel> GetByIdAsync(int id)
        {
            var model = await unitOfWork.UserProjectRepository.GetByIdAsync(id);

            return mapper.Map<UserProjectModel>(model);
        }

        /// <summary>Gets the position by identifier asynchronous.</summary>
        /// <param name="id">The identifier.</param>
        /// <returns>PositionModel</returns>
        public async Task<PositionModel> GetPositionByIdAsync(int id)
        {
            var model = await unitOfWork.PositionRepository.GetByIdAsync(id);

            return mapper.Map<PositionModel>(model);
        }

        /// <summary>Updates the userprojectmodel asynchronous.</summary>
        /// <param name="model">The model.</param>
        public async Task UpdateAsync(UserProjectModel model)
        {
            ValidateUserProject(model);

            var userProject = mapper.Map<UserProject>(model);

            unitOfWork.UserProjectRepository.Update(userProject);

            await unitOfWork.SaveAsync();
        }

        /// <summary>Updates the position asynchronous.</summary>
        /// <param name="model">The model.</param>
        public async Task UpdatePositionAsync(PositionModel model)
        {
            ValidatePosition(model);

            var position = mapper.Map<Position>(model);

            unitOfWork.PositionRepository.Update(position);

            await unitOfWork.SaveAsync();
        }

        static void ValidateUserProject(UserProjectModel model)
        {
            if (model is null)
                throw new TaskTrackingException("Model is null");
        }

        static void ValidatePosition(PositionModel model)
        {
            if (model is null)
                throw new TaskTrackingException("Model is null");

            if (string.IsNullOrEmpty(model.Name) || string.IsNullOrEmpty(model.Description))
                throw new TaskTrackingException("Name or description is null or empty");
        }
    }
}

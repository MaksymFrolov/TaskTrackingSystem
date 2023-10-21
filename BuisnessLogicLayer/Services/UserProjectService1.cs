using AutoMapper;
using BuisnessLogicLayer.Interfaces;
using BuisnessLogicLayer.Models;
using BuisnessLogicLayer.Validation;

namespace BuisnessLogicLayer.Services
{
    /// <summary>
    ///   Implements a userProjectService
    /// </summary>
    public class UserProjectService1 : IUserProjectService1
    {
        readonly IUnitOfWork1 _unitOfWork1;

        readonly IMapper mapper;

        readonly IEmailService emailService;

        /// <summary>Initializes a new instance of the <see cref="UserProjectService1" /> class.</summary>
        /// <param name="unitOfWork1">The unit of work.</param>
        /// <param name="mapper">The mapper.</param>
        public UserProjectService1(IUnitOfWork1 unitOfWork1, IMapper mapper, IEmailService emailService)
        {
            this._unitOfWork1 = unitOfWork1;
            this.mapper = mapper;
            this.emailService = emailService;
        }

        /// <summary>Adds the UserProjectModel asynchronous.</summary>
        /// <param name="model">The UserProjectModel.</param>
        public async Task AddAsync(UserProjectModel model)
        {
            ValidateUserProject(model);

            var userProject = mapper.Map<UserProject>(model);

            await _unitOfWork1.UserProjectRepository1.AddAsync(userProject);

            await _unitOfWork1.SaveAsync();

            var message = new MessageModel(model.UserEmail,
                "You have a new task!",
                $"Hello! We are to inform that you have been added to a new task!\n\n" +
                $"Please check it out! Maybe it's your moment!\n" +
                $"Thanks, The Task tracking system team.");

            await emailService.SendEmailAsync(message);
        }

        /// <summary>Adds the user projects asynchronous.</summary>
        /// <param name="models">The models.</param>
        public async Task AddUserProjectsAsync(IEnumerable<UserProjectModel> models)
        {
            foreach (var model in models)
            {
                ValidateUserProject(model);

                var userProject = mapper.Map<UserProject>(model);

                await _unitOfWork1.UserProjectRepository1.AddAsync(userProject);
            }

            await _unitOfWork1.SaveAsync();

            var message = new MessageModel(models.Select(t => t.UserEmail),
                "You have a new task!",
                $"Hello! We are to inform that you have been added to a new task!\n\n" +
                $"Please check it out! Maybe it's your moment!\n" +
                $"Thanks, The Task tracking system team.");

            await emailService.SendEmailAsync(message);
        }

        /// <summary>Adds the position asynchronous.</summary>
        /// <param name="model">The model.</param>
        public async Task AddPositionAsync(PositionModel model)
        {
            ValidatePosition(model);

            var position = mapper.Map<Position>(model);

            await _unitOfWork1.PositionRepository1.AddAsync(position);

            await _unitOfWork1.SaveAsync();
        }

        /// <summary>Deletes the userprojectmodel by id asynchronous.</summary>
        /// <param name="id">The identifier.</param>
        public async Task DeleteAsync(int id)
        {
            var userProject = await GetByIdAsync(id);

            await _unitOfWork1.UserProjectRepository1.DeleteByIdAsync(id);

            await _unitOfWork1.SaveAsync();

            var message = new MessageModel(userProject.UserEmail,
                $"Hello! You have been excluded from the task {userProject.TaskName}.",
                $"Hello! We have found out that you have been excluded from the task!\n\n" +
                $"May be it's time to upgrade yourself? We wish to to get back as soon as possible!\n" +
                $"Thanks, The Task tracking system team.");

            await emailService.SendEmailAsync(message);
        }

        /// <summary>Deletes the user projects asynchronous.</summary>
        /// <param name="ids">The ids.</param>
        public async Task DeleteUserProjectsAsync(IEnumerable<int> ids)
        {
            foreach (var id in ids)
                await _unitOfWork1.UserProjectRepository1.DeleteByIdAsync(id);

            await _unitOfWork1.SaveAsync();
        }

        /// <summary>Deletes the position asynchronous.</summary>
        /// <param name="id">The identifier.</param>
        public async Task DeletePositionAsync(int id)
        {
            await _unitOfWork1.PositionRepository1.DeleteByIdAsync(id);

            await _unitOfWork1.SaveAsync();
        }

        /// <summary>Gets all userprojectmodels asynchronous.</summary>
        /// <returns>Models</returns>
        public async Task<IEnumerable<UserProjectModel>> GetAllAsync()
        {
            var list = await _unitOfWork1.UserProjectRepository1.GetAllWithDetailsAsync();

            return mapper.Map<IEnumerable<UserProjectModel>>(list);
        }

        /// <summary>Gets all positions asynchronous.</summary>
        /// <returns>PositionModels</returns>
        public async Task<IEnumerable<PositionModel>> GetAllPositionsAsync()
        {
            var list = await _unitOfWork1.PositionRepository1.GetAllAsync();

            return mapper.Map<IEnumerable<PositionModel>>(list);
        }

        /// <summary>Gets the userprojectmodel by identifier asynchronous.</summary>
        /// <param name="id">The identifier.</param>
        /// <returns>Model</returns>
        public async Task<UserProjectModel> GetByIdAsync(int id)
        {
            var model = await _unitOfWork1.UserProjectRepository1.GetByIdAsync(id);

            return mapper.Map<UserProjectModel>(model);
        }

        /// <summary>Gets the position by identifier asynchronous.</summary>
        /// <param name="id">The identifier.</param>
        /// <returns>PositionModel</returns>
        public async Task<PositionModel> GetPositionByIdAsync(int id)
        {
            var model = await _unitOfWork1.PositionRepository1.GetByIdAsync(id);

            return mapper.Map<PositionModel>(model);
        }

        /// <summary>Updates the userprojectmodel asynchronous.</summary>
        /// <param name="model">The model.</param>
        public async Task UpdateAsync(UserProjectModel model)
        {
            ValidateUserProject(model);

            var userProject = mapper.Map<UserProject>(model);

            _unitOfWork1.UserProjectRepository1.Update(userProject);

            await _unitOfWork1.SaveAsync();
        }

        /// <summary>Updates the position asynchronous.</summary>
        /// <param name="model">The model.</param>
        public async Task UpdatePositionAsync(PositionModel model)
        {
            ValidatePosition(model);

            var position = mapper.Map<Position>(model);

            _unitOfWork1.PositionRepository1.Update(position);

            await _unitOfWork1.SaveAsync();
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

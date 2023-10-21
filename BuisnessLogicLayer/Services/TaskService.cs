using AutoMapper;
using BuisnessLogicLayer.Interfaces;
using BuisnessLogicLayer.Models;
using BuisnessLogicLayer.Validation;

namespace BuisnessLogicLayer.Services
{
    /// <summary>
    ///   Implements a taskService
    /// </summary>
    public class TaskService : ITaskService
    {
        readonly IUnitOfWork1 _unitOfWork1;

        readonly IMapper mapper;

        readonly IEmailService emailService;

        /// <summary>Initializes a new instance of the <see cref="TaskService" /> class.</summary>
        /// <param name="unitOfWork1">The unit of work.</param>
        /// <param name="mapper">The mapper.</param>
        public TaskService(IUnitOfWork1 unitOfWork1, IMapper mapper, IEmailService emailService)
        {
            this._unitOfWork1 = unitOfWork1;
            this.mapper = mapper;
            this.emailService = emailService;
        }

        /// <summary>Adds the model asynchronous.</summary>
        /// <param name="model">The model.</param>
        /// <exception cref="BuisnessLogicLayer.Validation.TaskTrackingException">Model is null</exception>
        public async Task AddAsync(TaskModel model)
        {
            if (model is null)
                throw new TaskTrackingException("Model is null");

            var project = await _unitOfWork1.ProjectRepository1.GetByIdAsync(model.ProjectId);

            ValidateTask(model, project);

            var task = mapper.Map<Assignment>(model);

            await _unitOfWork1.AssignmentRepository1.AddAsync(task);

            await _unitOfWork1.SaveAsync();
        }

        /// <summary>Adds the status asynchronous.</summary>
        /// <param name="model">The status model.</param>
        public async Task AddStatusAsync(StatusModel model)
        {
            ValidateStatus(model);

            var status = mapper.Map<AssignmentStatus>(model);

            await _unitOfWork1.AssignmentStatusRepository1.AddAsync(status);

            await _unitOfWork1.SaveAsync();
        }

        /// <summary>Deletes the taskModel by id asynchronous.</summary>
        /// <param name="id">The identifier.</param>
        public async Task DeleteAsync(int id)
        {
            var users = await GetAllUsersByTaskIdAsync(id);

            var task = await GetByIdAsync(id);

            await _unitOfWork1.AssignmentRepository1.DeleteByIdAsync(id);

            await _unitOfWork1.SaveAsync();

            if (users.Count() > 0)
            {
                var message = new MessageModel(users.Select(t => t.Email),
                $"Task you have been working has been deleted!",
                $"Hello! We are to inform that your task has been deleted!\n\n" +
                $"Please, check out what's new. Maybe, it's time to relax?\n" +
                $"Tip: the best way is to change your activity.\n" +
                $"Thanks, The Task tracking system team.");

                await emailService.SendEmailAsync(message);
            }
        }

        /// <summary>Deletes the status asynchronous.</summary>
        /// <param name="id">The identifier.</param>
        public async Task DeleteStatusAsync(int id)
        {
            await _unitOfWork1.AssignmentStatusRepository1.DeleteByIdAsync(id);

            await _unitOfWork1.SaveAsync();
        }

        /// <summary>Gets all taskModels asynchronous.</summary>
        /// <returns>Models</returns>
        public async Task<IEnumerable<TaskModel>> GetAllAsync()
        {
            var list = await _unitOfWork1.AssignmentRepository1.GetAllWithDetailsAsync();

            return mapper.Map<IEnumerable<TaskModel>>(list);
        }

        /// <summary>Gets all statuses asynchronous.</summary>
        /// <returns>StatusModels</returns>
        public async Task<IEnumerable<StatusModel>> GetAllStatusesAsync()
        {
            var list = await _unitOfWork1.AssignmentStatusRepository1.GetAllAsync();

            return mapper.Map<IEnumerable<StatusModel>>(list);
        }

        /// <summary>Gets the model by identifier asynchronous.</summary>
        /// <param name="id">The identifier.</param>
        /// <returns>TokenModel</returns>
        public async Task<TaskModel> GetByIdAsync(int id)
        {
            var model = await _unitOfWork1.AssignmentRepository1.GetByIdWithDetailsAsync(id);

            return mapper.Map<TaskModel>(model);
        }

        /// <summary>Gets the status by identifier asynchronous.</summary>
        /// <param name="id">The identifier.</param>
        /// <returns>StatusModel</returns>
        public async Task<StatusModel> GetStatusByIdAsync(int id)
        {
            var model = await _unitOfWork1.AssignmentStatusRepository1.GetByIdAsync(id);

            return mapper.Map<StatusModel>(model);
        }

        /// <summary>Updates the taskModel asynchronous.</summary>
        /// <param name="model">The model.</param>
        /// <exception cref="BuisnessLogicLayer.Validation.TaskTrackingException">Model is null</exception>
        public async Task UpdateAsync(TaskModel model)
        {
            if (model is null)
                throw new TaskTrackingException("Model is null");

            var project = await _unitOfWork1.ProjectRepository1.GetByIdAsync(model.ProjectId);

            ValidateTask(model, project);

            var task = mapper.Map<Assignment>(model);

            _unitOfWork1.AssignmentRepository1.Update(task);

            await _unitOfWork1.SaveAsync();

            var users = await GetAllUsersByTaskIdAsync(task.Id);

            if (users.Count() > 0)
            {
                var message = new MessageModel(users.Select(t => t.Email),
                $"Your task has been updated!",
                $"Hello! We are to inform that your task has been updated!\n\n" +
                $"Please check out what's new. Maybe this will help you to make your assignment better!\n" +
                $"Thanks, The Task tracking system team.");

                await emailService.SendEmailAsync(message);
            }
        }

        /// <summary>Updates the status asynchronous.</summary>
        /// <param name="model">The status model.</param>
        public async Task UpdateStatusAsync(StatusModel model)
        {
            ValidateStatus(model);

            var status = mapper.Map<AssignmentStatus>(model);

            _unitOfWork1.AssignmentStatusRepository1.Update(status);

            await _unitOfWork1.SaveAsync();
        }

        /// <summary>Gets all users by task identifier asynchronous.</summary>
        /// <param name="id">The identifier.</param>
        /// <returns>UserModels</returns>
        public async Task<IEnumerable<UserModel>> GetAllUsersByTaskIdAsync(int id)
        {
            var list = (await _unitOfWork1.AssignmentRepository1
                .GetByIdWithDetailsAsync(id))
                .UserProjects
                .Select(t => t.User)
                .Distinct();

            return mapper.Map<IEnumerable<UserModel>>(list);
        }

        /// <summary>Updates the task status asynchronous.</summary>
        /// <param name="id">The identifier.</param>
        /// <param name="status">The status.</param>
        public async Task UpdateTaskStatusAsync(int id, StatusModel status)
        {
            ValidateStatus(status);

            var task = await _unitOfWork1.AssignmentRepository1.GetByIdWithDetailsAsync(id);

            if (task.ExpiryDate.Subtract(DateTime.Now).TotalMinutes < 0)
                throw new TaskTrackingException();

            task.Status = mapper.Map<AssignmentStatus>(status);

            await _unitOfWork1.SaveAsync();
        }

        static void ValidateTask(TaskModel model, Project project)
        {
            if (string.IsNullOrEmpty(model.Name) || string.IsNullOrEmpty(model.Description))
                throw new TaskTrackingException("Name or description is null or empty");

            if (model.StartDate.Subtract(project.StartDate).TotalHours < 0)
                throw new TaskTrackingException("Date is incorrect");

            if (project.ExpiryDate.Subtract(model.ExpiryDate).TotalMinutes < 0)
                throw new TaskTrackingException("Date is incorrect");
        }

        static void ValidateStatus(StatusModel model)
        {
            if (model is null)
                throw new TaskTrackingException("Model is null");

            if (string.IsNullOrEmpty(model.Name))
                throw new TaskTrackingException("Name is null or empty");
        }
    }
}

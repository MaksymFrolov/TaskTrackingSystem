using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    /// <summary>
    ///   UsersController
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        readonly IUserService userService;

        /// <summary>Initializes a new instance of the <see cref="UsersController" /> class.</summary>
        /// <param name="userService">The user service.</param>
        public UsersController(IUserService userService)
        {
            this.userService = userService;
        }

        /// <summary>Gets the users.</summary>
        /// <returns>
        ///   OkObjectResult
        /// </returns>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserModel>>> GetUsers()
        {
            return Ok(await userService.GetAllAsync());
        }

        /// <summary>Gets the roles.</summary>
        /// <returns>
        ///   OkObjectResult
        /// </returns>
        [HttpGet("roles")]
        public async Task<ActionResult<IEnumerable<RoleModel>>> GetRoles()
        {
            return Ok(await userService.GetAllRolesAsync());
        }

        /// <summary>Gets the user by identifier.</summary>
        /// <param name="id">The identifier.</param>
        /// <returns>
        ///   OkObjectResult or NotFoundObjectResult
        /// </returns>
        [HttpGet("{id}")]
        public async Task<ActionResult<UserModel>> GetUserById(int id)
        {
            var model = await userService.GetByIdAsync(id);

            if (model is null)
                return NotFound();

            return Ok(model);
        }

        /// <summary>Gets the user by email.</summary>
        /// <param name="email">The email.</param>
        /// <returns>
        ///   OkObjectResult or NotFoundObjectResult
        /// </returns>
        [HttpGet("email/{email}")]
        public async Task<ActionResult<UserModel>> GetUserByEmail(string email)
        {
            var model = await userService.GetByEmailAsync(email);

            if (model is null)
                return NotFound();

            return Ok(model);
        }

        /// <summary>Gets the role by identifier.</summary>
        /// <param name="id">The identifier.</param>
        /// <returns>
        ///   OkObjectResult or NotFoundObjectResult
        /// </returns>
        [HttpGet("roles/{id}")]
        public async Task<ActionResult<RoleModel>> GetRoleById(int id)
        {
            var model = await userService.GetRoleByIdAsync(id);

            if (model is null)
                return NotFound();

            return Ok(model);
        }

        /// <summary>Gets the positions by user identifier.</summary>
        /// <param name="id">The identifier.</param>
        /// <returns>
        ///   OkObjectResult
        /// </returns>
        [HttpGet("{id}/positions")]
        public async Task<ActionResult<IEnumerable<PositionModel>>> GetPositionsByUserId(int id)
        {
            return Ok(await userService.GetAllPositionsByUserIdAsync(id));
        }

        /// <summary>Gets the projects by user identifier.</summary>
        /// <param name="id">The identifier.</param>
        /// <returns>
        ///   OkObjectResult
        /// </returns>
        [HttpGet("{id}/projects")]
        public async Task<ActionResult<IEnumerable<ProjectModel>>> GetProjectsByUserId(int id)
        {
            return Ok(await userService.GetAllProjectsByUserIdAsync(id));
        }

        /// <summary>Gets the tasks by user identifier.</summary>
        /// <param name="id">The identifier.</param>
        /// <returns>
        ///   OkObjectResult
        /// </returns>
        [HttpGet("{id}/tasks")]
        public async Task<ActionResult<IEnumerable<TaskModel>>> GetTasksByUserId(int id)
        {
            return Ok(await userService.GetAllTasksByUserIdAsync(id));
        }

        /// <summary>Gets the tasks by manager identifier.</summary>
        /// <param name="id">The identifier.</param>
        /// <returns>
        ///   OkObjectResult
        /// </returns>
        [HttpGet("{id}/manager/tasks")]
        public async Task<ActionResult<IEnumerable<TaskModel>>> GetTasksByManagerId(int id)
        {
            return Ok(await userService.GetAllTasksByManagerIdAsync(id));
        }

        /// <summary>Gets the roles by user identifier.</summary>
        /// <param name="id">The identifier.</param>
        /// <returns>
        ///   OkObjectResult
        /// </returns>
        [HttpGet("{id}/roles")]
        public async Task<ActionResult<IEnumerable<RoleModel>>> GetRolesByUserId(int id)
        {
            return Ok(await userService.GetAllRolesByUserIdAsync(id));
        }

        /// <summary>Adds the user.</summary>
        /// <param name="model">The model.</param>
        /// <returns>
        ///   OkObjectResult
        /// </returns>
        [HttpPost]
        public async Task<ActionResult> AddUser([FromBody] RegisterUserModel model)
        {
            await userService.AddAsync(model);

            return Ok();
        }

        /// <summary>Adds the role.</summary>
        /// <param name="model">The model.</param>
        /// <returns>
        ///   OkObjectResult
        /// </returns>
        [HttpPost("roles")]
        public async Task<ActionResult> AddRole([FromBody] RoleModel model)
        {
            await userService.AddRoleAsync(model);

            return Ok();
        }

        /// <summary>Adds to role.</summary>
        /// <param name="id">The identifier.</param>
        /// <param name="model">The model.</param>
        /// <returns>
        ///   OkObjectResult
        /// </returns>
        [HttpPost("{id}/role")]
        public async Task<ActionResult> AddToRole(int id, [FromBody] RoleModel model)
        {
            await userService.AddToRoleAsync(id, model);

            return Ok();
        }

        /// <summary>Adds to roles.</summary>
        /// <param name="id">The identifier.</param>
        /// <param name="models">The models.</param>
        /// <returns>
        ///   OkObjectResult 
        /// </returns>
        [HttpPost("{id}/roles")]
        public async Task<ActionResult> AddToRoles(int id, [FromBody] IEnumerable<RoleModel> models)
        {
            await userService.AddToRolesAsync(id, models);

            return Ok();
        }

        /// <summary>Updates the user.</summary>
        /// <param name="model">The model.</param>
        /// <returns>
        ///   OkObjectResult
        /// </returns>
        [HttpPut]
        public async Task<ActionResult> UpdateUser([FromBody] UpdateUserModel model)
        {
            await userService.UpdateAsync(model);

            return Ok();
        }

        /// <summary>Updates the role.</summary>
        /// <param name="model">The model.</param>
        /// <returns>
        ///   OkObjectResult
        /// </returns>
        [HttpPut("roles")]
        public async Task<ActionResult> UpdateRole([FromBody] RoleModel model)
        {
            await userService.UpdateRoleAsync(model);

            return Ok();
        }

        /// <summary>Deletes the user.</summary>
        /// <param name="id">The identifier.</param>
        /// <returns>
        ///   OkObjectResult
        /// </returns>
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteUser(int id)
        {
            await userService.DeleteAsync(id);

            return Ok();
        }

        /// <summary>Deletes the role.</summary>
        /// <param name="id">The identifier.</param>
        /// <returns>
        ///   OkObjectResult
        /// </returns>
        [HttpDelete("roles/{id}")]
        public async Task<ActionResult> DeleteRole(int id)
        {
            await userService.DeleteRoleAsync(id);

            return Ok();
        }

        /// <summary>Deletes to role.</summary>
        /// <param name="id">The identifier.</param>
        /// <param name="name">The name.</param>
        /// <returns>
        ///   OkObjectResult
        /// </returns>
        [HttpDelete("{id}/role")]
        public async Task<ActionResult> DeleteToRole(int id, [FromQuery] string name)
        {
            await userService.DeleteToRoleAsync(id, name);

            return Ok();
        }

        /// <summary>Deletes to roles.</summary>
        /// <param name="id">The identifier.</param>
        /// <param name="names">The names.</param>
        /// <returns>
        ///   OkObjectResult
        /// </returns>
        [HttpDelete("{id}/roles")]
        public async Task<ActionResult> DeleteToRoles(int id, [FromQuery] IEnumerable<string> names)
        {
            await userService.DeleteToRolesAsync(id, names);

            return Ok();
        }
    }
}

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
        readonly IUserService1 _userService1;

        /// <summary>Initializes a new instance of the <see cref="UsersController" /> class.</summary>
        /// <param name="userService1">The user service.</param>
        public UsersController(IUserService1 userService1)
        {
            this._userService1 = userService1;
        }

        /// <summary>Gets the users.</summary>
        /// <returns>
        ///   OkObjectResult
        /// </returns>
        [HttpGet]
        [Authorize]
        public async Task<ActionResult<IEnumerable<UserModel>>> GetUsers()
        {
            return Ok(await _userService1.GetAllAsync());
        }

        /// <summary>Gets the roles.</summary>
        /// <returns>
        ///   OkObjectResult
        /// </returns>
        [HttpGet("roles")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<RoleModel>>> GetRoles()
        {
            return Ok(await _userService1.GetAllRolesAsync());
        }

        /// <summary>Gets the user by identifier.</summary>
        /// <param name="id">The identifier.</param>
        /// <returns>
        ///   OkObjectResult or NotFoundObjectResult
        /// </returns>
        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<UserModel>> GetUserById(int id)
        {
            var model = await _userService1.GetByIdAsync(id);

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
        [Authorize]
        public async Task<ActionResult<UserModel>> GetUserByEmail(string email)
        {
            var model = await _userService1.GetByEmailAsync(email);

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
        [Authorize]
        public async Task<ActionResult<RoleModel>> GetRoleById(int id)
        {
            var model = await _userService1.GetRoleByIdAsync(id);

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
        [Authorize(Roles = "Manager, User")]
        public async Task<ActionResult<IEnumerable<PositionModel>>> GetPositionsByUserId(int id)
        {
            return Ok(await _userService1.GetAllPositionsByUserIdAsync(id));
        }

        /// <summary>Gets the projects by user identifier.</summary>
        /// <param name="id">The identifier.</param>
        /// <returns>
        ///   OkObjectResult
        /// </returns>
        [HttpGet("{id}/projects")]
        [Authorize(Roles = "Manager, User")]
        public async Task<ActionResult<IEnumerable<ProjectModel>>> GetProjectsByUserId(int id)
        {
            return Ok(await _userService1.GetAllProjectsByUserIdAsync(id));
        }

        /// <summary>Gets the tasks by user identifier.</summary>
        /// <param name="id">The identifier.</param>
        /// <returns>
        ///   OkObjectResult
        /// </returns>
        [HttpGet("{id}/tasks")]
        [Authorize(Roles = "Manager, User")]
        public async Task<ActionResult<IEnumerable<TaskModel>>> GetTasksByUserId(int id)
        {
            return Ok(await _userService1.GetAllTasksByUserIdAsync(id));
        }

        /// <summary>Gets the tasks by manager identifier.</summary>
        /// <param name="id">The identifier.</param>
        /// <returns>
        ///   OkObjectResult
        /// </returns>
        [HttpGet("{id}/manager/tasks")]
        [Authorize(Roles = "Manager")]
        public async Task<ActionResult<IEnumerable<TaskModel>>> GetTasksByManagerId(int id)
        {
            return Ok(await _userService1.GetAllTasksByManagerIdAsync(id));
        }

        /// <summary>Gets the roles by user identifier.</summary>
        /// <param name="id">The identifier.</param>
        /// <returns>
        ///   OkObjectResult
        /// </returns>
        [HttpGet("{id}/roles")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<RoleModel>>> GetRolesByUserId(int id)
        {
            return Ok(await _userService1.GetAllRolesByUserIdAsync(id));
        }

        /// <summary>Adds the user.</summary>
        /// <param name="model">The model.</param>
        /// <returns>
        ///   OkObjectResult
        /// </returns>
        [HttpPost]
        [AllowAnonymous]
        public async Task<ActionResult> AddUser([FromBody] RegisterUserModel model)
        {
            await _userService1.AddAsync(model);

            return Ok();
        }

        /// <summary>Adds the role.</summary>
        /// <param name="model">The model.</param>
        /// <returns>
        ///   OkObjectResult
        /// </returns>
        [HttpPost("roles")]
        [Authorize(Roles = "Administrator")]
        public async Task<ActionResult> AddRole([FromBody] RoleModel model)
        {
            await _userService1.AddRoleAsync(model);

            return Ok();
        }

        /// <summary>Adds to role.</summary>
        /// <param name="id">The identifier.</param>
        /// <param name="model">The model.</param>
        /// <returns>
        ///   OkObjectResult
        /// </returns>
        [HttpPost("{id}/role")]
        [Authorize(Roles = "Administrator")]
        public async Task<ActionResult> AddToRole(int id, [FromBody] RoleModel model)
        {
            await _userService1.AddToRoleAsync(id, model);

            return Ok();
        }

        /// <summary>Adds to roles.</summary>
        /// <param name="id">The identifier.</param>
        /// <param name="models">The models.</param>
        /// <returns>
        ///   OkObjectResult 
        /// </returns>
        [HttpPost("{id}/roles")]
        [Authorize(Roles = "Administrator")]
        public async Task<ActionResult> AddToRoles(int id, [FromBody] IEnumerable<RoleModel> models)
        {
            await _userService1.AddToRolesAsync(id, models);

            return Ok();
        }

        /// <summary>Updates the user.</summary>
        /// <param name="model">The model.</param>
        /// <returns>
        ///   OkObjectResult
        /// </returns>
        [HttpPut]
        [Authorize]
        public async Task<ActionResult> UpdateUser([FromBody] UpdateUserModel model)
        {
            await _userService1.UpdateAsync(model);

            return Ok();
        }

        /// <summary>Updates the role.</summary>
        /// <param name="model">The model.</param>
        /// <returns>
        ///   OkObjectResult
        /// </returns>
        [HttpPut("roles")]
        [Authorize(Roles = "Administrator")]
        public async Task<ActionResult> UpdateRole([FromBody] RoleModel model)
        {
            await _userService1.UpdateRoleAsync(model);

            return Ok();
        }

        /// <summary>Deletes the user.</summary>
        /// <param name="id">The identifier.</param>
        /// <returns>
        ///   OkObjectResult
        /// </returns>
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<ActionResult> DeleteUser(int id)
        {
            await _userService1.DeleteAsync(id);

            return Ok();
        }

        /// <summary>Deletes the role.</summary>
        /// <param name="id">The identifier.</param>
        /// <returns>
        ///   OkObjectResult
        /// </returns>
        [HttpDelete("roles/{id}")]
        [Authorize(Roles = "Administrator")]
        public async Task<ActionResult> DeleteRole(int id)
        {
            await _userService1.DeleteRoleAsync(id);

            return Ok();
        }

        /// <summary>Deletes to role.</summary>
        /// <param name="id">The identifier.</param>
        /// <param name="name">The name.</param>
        /// <returns>
        ///   OkObjectResult
        /// </returns>
        [HttpDelete("{id}/role")]
        [Authorize(Roles = "Administrator")]
        public async Task<ActionResult> DeleteToRole(int id, [FromQuery] string name)
        {
            await _userService1.DeleteToRoleAsync(id, name);

            return Ok();
        }

        /// <summary>Deletes to roles.</summary>
        /// <param name="id">The identifier.</param>
        /// <param name="names">The names.</param>
        /// <returns>
        ///   OkObjectResult
        /// </returns>
        [HttpDelete("{id}/roles")]
        [Authorize(Roles = "Administrator")]
        public async Task<ActionResult> DeleteToRoles(int id, [FromQuery] IEnumerable<string> names)
        {
            await _userService1.DeleteToRolesAsync(id, names);

            return Ok();
        }
    }
}

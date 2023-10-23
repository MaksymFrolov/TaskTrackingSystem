using BuisnessLogicLayer.Requests.Projects;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectsController : ControllerBase
    {
        private readonly IMediator _mediator;
        
        public ProjectsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        [Authorize(Roles = "User, Manager")]
        public async Task<ActionResult<IEnumerable<ProjectModel>>> GetProjects()
        {
            var response = await _mediator.Send(new GetProjectsRequest());
            
            return Ok(response);
        }

        [HttpGet("{id}")]
        [Authorize(Roles = "User, Manager")]
        public async Task<ActionResult<ProjectModel>> GetProjectById(int id)
        {
            var response = await _mediator.Send(new GetProjectRequest(id));

            return Ok(response);
        }
        
        // [HttpGet("{id}/tasks")]
        // [Authorize(Roles = "User, Manager")]
        // public async Task<ActionResult<IEnumerable<TaskModel>>> GetTasksByProjectId(int id)
        // {
        //     return Ok(await _projectService1.GetAllTasksByProjectIdAsync(id));
        // }
        
        // [HttpGet("{id}/users")]
        // [Authorize(Roles = "User, Manager")]
        // public async Task<ActionResult<IEnumerable<UserModel>>> GetUsersByProjectId(int id)
        // {
        //     return Ok(await _projectService1.GetAllUsersByProjectIdAsync(id));
        // }
        
        [HttpPost]
        [Authorize(Roles = "Manager")]
        public async Task<ActionResult> AddProject([FromBody] AddProjectRequest request)
        {
            await _mediator.Send(request);

            return Ok();
        }
        
        [HttpPut]
        [Authorize(Roles = "Manager")]
        public async Task<ActionResult> UpdateProject([FromBody] UpdateProjectRequest request)
        {
            await _mediator.Send(request);

            return Ok();
        }
        
        [HttpDelete("{id}")]
        [Authorize(Roles = "Manager")]
        public async Task<ActionResult> Delete(int id)
        {
            await _mediator.Send(new DeleteProjectRequest(id));

            return Ok();
        }
    }
}

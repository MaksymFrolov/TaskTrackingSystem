using BuisnessLogicLayer.Requests.Assignments;
using BuisnessLogicLayer.Responses.Assignments;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AssignmentsController : ControllerBase
    {
        private readonly IMediator _mediator;

        public AssignmentsController(IMediator mediator)
        {
            _mediator = mediator;
        }
        
        [HttpGet]
        [Authorize(Roles = "User, Manager")]
        public async Task<ActionResult<GetAssignmentsResponse>> GetAll()
        {
            var response = await _mediator.Send(new GetAssignmentsRequest());
            
            return Ok(response);
        }

        [HttpGet("{id}")]
        [Authorize(Roles = "User, Manager")]
        public async Task<ActionResult<GetAssignmentResponse>> GetById(int id)
        {
            var response = await _mediator.Send(new GetAssignmentRequest(id));

            return Ok(response);
        }
        
        // [HttpGet("{id}/users")]
        // [Authorize(Roles = "User, Manager")]
        // public async Task<ActionResult<IEnumerable<UserModel>>> GetUsersByTaskId(int id)
        // {
        //     return Ok(await taskService.GetAllUsersByTaskIdAsync(id));
        // }
        
        [HttpPost]
        [Authorize(Roles = "Manager")]
        public async Task<ActionResult> Add([FromBody] AddAssignmentRequest request)
        {
            await _mediator.Send(request);

            return Ok();
        }
        
        [HttpPut]
        [Authorize(Roles = "Manager")]
        public async Task<ActionResult> Update([FromBody] UpdateAssignmentRequest request)
        {
            await _mediator.Send(request);

            return Ok();
        }
        
        [HttpDelete("{id}")]
        [Authorize(Roles = "Manager")]
        public async Task<ActionResult> Delete(int id)
        {
            await _mediator.Send(new DeleteAssignmentRequest(id));
            
            return Ok();
        }
    }
}

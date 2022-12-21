using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    /// <summary>
    ///   AuthController
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        readonly IAuthService authService;

        /// <summary>Initializes a new instance of the <see cref="AuthController" /> class.</summary>
        /// <param name="authService">The authentication service.</param>
        public AuthController(IAuthService authService)
        {
            this.authService = authService;
        }

        /// <summary>Logins.</summary>
        /// <param name="loginModel">The login model.</param>
        /// <returns>
        ///   ObjectResult
        /// </returns>
        [HttpPost]
        public async Task<ActionResult<TokenModel>> Login([FromBody] LoginModel loginModel)
        {
            var model = await authService.Login(loginModel);

            return Ok(model);
        }
    }
}

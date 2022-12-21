using BuisnessLogicLayer.Interfaces;
using BuisnessLogicLayer.Models;
using BuisnessLogicLayer.Validation;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;

namespace BuisnessLogicLayer.Services
{
    /// <summary>
    ///   Implements a authService
    /// </summary>
    public class AuthService : IAuthService
    {
        readonly UserManager<User> userManager;

        readonly IGenerateTokenService generateTokenService;

        /// <summary>Initializes a new instance of the <see cref="AuthService" /> class.</summary>
        /// <param name="userManager">The user manager.</param>
        /// <param name="generateTokenService">The generate token service.</param>
        public AuthService(UserManager<User> userManager, IGenerateTokenService generateTokenService)
        {
            this.userManager = userManager;
            this.generateTokenService = generateTokenService;
        }

        /// <summary>Logins.</summary>
        /// <param name="model">Login model.</param>
        /// <returns>TokenModel</returns>
        /// <exception cref="BuisnessLogicLayer.Validation.TaskTrackingException">User not found</exception>
        public async Task<TokenModel> Login(LoginModel model)
        {
            Validate(model);

            var user = await userManager.FindByEmailAsync(model.Login);

            if (user is null || !await userManager.CheckPasswordAsync(user, model.Password))
                throw new TaskTrackingException("User not found");

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.UserName)
            };

            foreach (var item in await userManager.GetRolesAsync(user))
                claims.Add(new Claim(ClaimTypes.Role, item));

            var accessToken = generateTokenService.GenerateAccessToken(claims);

            var refreshToken = generateTokenService.GenerateRefreshToken();

            user.RefreshToken = refreshToken;

            user.RefreshTokenExpiryTime = DateTime.Now.AddDays(7);

            await userManager.UpdateAsync(user);

            return new TokenModel
            {
                AccessToken = accessToken,
                RefreshToken = refreshToken
            };
        }

        static void Validate(LoginModel model)
        {
            if (model is null)
                throw new TaskTrackingException("Model is null");

            if (string.IsNullOrEmpty(model.Login) || string.IsNullOrEmpty(model.Password))
                throw new TaskTrackingException("Login or password is null or empty");
        }
    }
}

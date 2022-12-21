using BuisnessLogicLayer.Models;

namespace BuisnessLogicLayer.Interfaces
{
    /// <summary>
    ///   Describes an authService
    /// </summary>
    public interface IAuthService
    {
        /// <summary>Logins.</summary>
        /// <param name="model">Login model.</param>
        /// <returns>
        ///   TokenModel
        /// </returns>
        Task<TokenModel> Login(LoginModel model);
    }
}

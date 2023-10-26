using System.Linq.Expressions;
using BuisnessLogicLayer.Interfaces;
using BuisnessLogicLayer.Requests.Tokens;
using MediatR;

namespace BuisnessLogicLayer.Commands.Tokens.RevokeToken;

public class RevokeTokenCommandHandler : IRequestHandler<RevokeTokenRequest>
{
    private readonly IGenerateTokenService _generateTokenService;
    private readonly IUserService _userService;

    public RevokeTokenCommandHandler(
        IGenerateTokenService generateTokenService,
        IUserService userService)
    {
        _generateTokenService = generateTokenService;
        _userService = userService;
    }
    
    public async Task Handle(RevokeTokenRequest request, CancellationToken cancellationToken)
    {
        var principal = _generateTokenService.GetPrincipalFromExpiredToken(request.AccessToken);

        var userName = principal.Identity.Name;

        Expression<Func<User, bool>> expression = u => u.UserName == userName;

        var user = (await _userService.GetAllByExpressionAsync(expression, cancellationToken)).First();

        user.RefreshToken = null;

        await _userService.UpdateAsync(user, cancellationToken);
    }
}
using BuisnessLogicLayer.Requests.Users;
using FluentValidation;

namespace BuisnessLogicLayer.Commands.Users.ResetPassword;

public class ResetPasswordRequestValidator : AbstractValidator<ResetPasswordRequest>
{
    public ResetPasswordRequestValidator()
    {
        RuleFor(t => t.Email)
            .NotEmpty()
            .EmailAddress()
            .MinimumLength(3)
            .MaximumLength(300);

        RuleFor(t => t.Token)
            .NotEmpty();

        RuleFor(t => t.Password)
            .NotEmpty()
            .MinimumLength(6)
            .MaximumLength(60)
            .Matches(@"[\!\?\*\.]+").WithMessage("Your password must contain at least one (!? *.).")
            .Matches(@"[0-9]+").WithMessage("Your password must contain at least one number.")
            .Matches(@"[A-Z]+").WithMessage("Your password must contain at least one uppercase letter.")
            .Matches(@"[a-z]+").WithMessage("Your password must contain at least one lowercase letter.");

        RuleFor(t => t.ConfirmPassword)
            .NotEmpty()
            .Equal(t => t.Password)
            .WithMessage("Passwords must match");
    }
}
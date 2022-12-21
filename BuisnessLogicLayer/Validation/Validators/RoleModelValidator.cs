using BuisnessLogicLayer.Models;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BuisnessLogicLayer.Validation.Validators
{
    public class RoleModelValidator : AbstractValidator<RoleModel>
    {
        public RoleModelValidator()
        {
            RuleFor(t => t.Name)
                .NotEmpty()
                .MinimumLength(1)
                .MaximumLength(50);

            RuleFor(t => t.NormalizedName)
                .NotEmpty()
                .Equal(t=>t.Name.ToUpper()).WithMessage("The string must contain upper case letters.");
        }
    }
}

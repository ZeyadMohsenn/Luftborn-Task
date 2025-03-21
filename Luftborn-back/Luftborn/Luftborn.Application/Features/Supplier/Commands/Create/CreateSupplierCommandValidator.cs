using FluentValidation;

namespace Luftborn.Application.Features.Supplier.Commands.Create;

public class CreateSupplierCommandValidator : AbstractValidator<CreateSupplierCommand>
{
    public CreateSupplierCommandValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty()
            .WithMessage("Name Is Required");

        RuleFor(x => x.SupplierType)
            .IsInEnum()
            .WithMessage("Invalid SupplierType");

        RuleForEach(x => x.Contacts)
            .ChildRules(contact =>
            {
                contact.RuleFor(c => c.Name)
                    .NotEmpty()
                    .WithMessage("Contact Name Is Required For Each Contact");
                    
                contact.RuleFor(c => c.PhoneNumber)
                    .NotEmpty()
                    .WithMessage("PhoneNumber Is Required For Each Contact");
            });
    }
}

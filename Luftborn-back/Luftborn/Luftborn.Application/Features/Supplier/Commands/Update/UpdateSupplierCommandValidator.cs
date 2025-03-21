using FluentValidation;
using Luftborn.Application.Common;
using Luftborn.Application.Features.Supplier.Commands.Create;

namespace Luftborn.Application.Features.Supplier.Commands.Update;

public class UpdateSupplierCommandValidator : AbstractValidator<UpdateSupplierCommand>
{
    public UpdateSupplierCommandValidator(IUnitOfWork unitOfWork)
    {
        RuleFor(x => x.Id)
            .NotEmpty()
            .WithMessage("Id Is Required");
        
        Include(new CreateSupplierCommandValidator());
    }
}

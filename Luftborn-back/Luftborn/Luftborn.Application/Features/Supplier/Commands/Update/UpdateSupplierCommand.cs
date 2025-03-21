using Luftborn.Application.Features.Supplier.Commands.Create;

namespace Luftborn.Application.Features.Supplier.Commands.Update;

public class UpdateSupplierCommand : CreateSupplierCommand
{
    public Guid Id { get; set; }
}

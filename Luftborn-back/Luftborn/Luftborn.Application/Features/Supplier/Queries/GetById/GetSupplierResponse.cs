using Luftborn.Application.Features.Supplier.Commands.Create;
using Luftborn.Domain.Enums;

namespace Luftborn.Application.Features.Supplier.Queries.GetById;

public class GetSupplierResponse
{
    public Guid Id { get; set; }
    public required string Name { get; set; }
    public string? Description { get; set; }
    public string? Notes { get; set; }
    public SupplierType SupplierType { get; set; }
    public string? Address { get; set; }
    public List<ContactsDto> Contacts { get; set; } = [];  
}

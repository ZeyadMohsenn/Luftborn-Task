using Luftborn.Domain.Dtos;
using Luftborn.Domain.Enums;
using MediatR;

namespace Luftborn.Application.Features.Supplier.Commands.Create;

public class CreateSupplierCommand : IRequest<Result<string>>
{
    public required string Name { get; set; }
    public SupplierType SupplierType { get; set; }
    public string? Description { get; set; }
    public string? Address { get; set; }
    public string? Notes { get; set; }
    public List<ContactsDto> Contacts { get; set; } = [];
}

public class ContactsDto 
{
    public required string Name { get; set; }
    public required string PhoneNumber { get; set; }
    public string? Email { get; set; }
}
using Luftborn.Domain.Enums;

namespace Luftborn.Domain.Entities.Supplier;

public class Supplier : BaseEntity
{
    public required string Name { get; set; }
    public SupplierType SupplierType { get; set; }
    public string? Description { get; set; }
    public string? Notes { get; set; }
    public string? Address { get; set; }
    public ICollection<Contact> Contacts { get; set; } = [];
}

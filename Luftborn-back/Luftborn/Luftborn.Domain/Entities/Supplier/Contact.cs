namespace Luftborn.Domain.Entities.Supplier;

public class Contact : BaseEntity
{
    public required string Name { get; set; }
    public required string PhoneNumber { get; set; }
    public string? Email { get; set; }
    public Guid SupplierId { get; set; }    
    public Supplier Supplier { get; set; } = null!;
}

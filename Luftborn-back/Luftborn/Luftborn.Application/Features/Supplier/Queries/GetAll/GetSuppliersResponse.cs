namespace Luftborn.Application.Features.Supplier.Queries.GetAll;

public class GetSuppliersResponse
{
    public Guid Id { get; set; }
    public required string Name { get; set; }
    public required string SupplierType { get; set; }
    public string? Description { get; set; }
    public string? Notes { get; set; }
}

using Luftborn.Application.Dto;
using Luftborn.Domain.Dtos;
using Luftborn.Domain.Enums;
using MediatR;

namespace Luftborn.Application.Features.Supplier.Queries.GetAll;

public class GetSuppliersQuery : Pagination, IRequest<Result<PaginationResponse<GetSuppliersResponse>>>
{
    public string? Name { get; set; }   
    public SupplierType? SupplierType { get; set; }
}
using Luftborn.Domain.Dtos;
using MediatR;

namespace Luftborn.Application.Features.Supplier.Queries.GetById;

public class GetSupplierQuery : IRequest<Result<GetSupplierResponse>>
{
    public Guid Id { get; set; }    
}

using Luftborn.Domain.Dtos;
using MediatR;

namespace Luftborn.Application.Features.Supplier.Commands.Delete;

public class DeleteSupplierCommand : IRequest<Result<bool>>
{
    public Guid Id { get; set; }
}


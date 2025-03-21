using AutoMapper;
using Luftborn.Application.Common;
using Luftborn.Domain.Dtos;
using Microsoft.EntityFrameworkCore;

namespace Luftborn.Application.Features.Supplier.Queries.GetById;

public class GetSupplierQueryHandler(IUnitOfWork unitOfWork, IMapper mapper)
 : BaseHandler<GetSupplierQuery, Result<GetSupplierResponse>>
{
    private readonly IGenericRepository<Domain.Entities.Supplier.Supplier> _supplierRepo = unitOfWork.GetRepository<Domain.Entities.Supplier.Supplier>();

    public override async Task<Result<GetSupplierResponse>> Handle(GetSupplierQuery request, CancellationToken cancellationToken)
    {
        var supplier = await _supplierRepo.FindAsync(
            s => s.Id == request.Id,
            Include: s => s.Include(c => c.Contacts),
            asNoTracking: true);

        if (supplier == null)
            return Result<GetSupplierResponse>.Fail("Supplier not found.");

        var response = mapper.Map<GetSupplierResponse>(supplier);

        return Result<GetSupplierResponse>.Success(response);
    }
}
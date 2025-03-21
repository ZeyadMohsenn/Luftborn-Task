using AutoMapper;
using Luftborn.Application.Common;
using Luftborn.Application.Dto;
using Luftborn.Application.Helper.Extensions;
using Luftborn.Domain.Dtos;
using Microsoft.EntityFrameworkCore;

namespace Luftborn.Application.Features.Supplier.Queries.GetAll;

public class GetSuppliersQueryHandler(IUnitOfWork unitOfWork, IMapper mapper)
    : BaseHandler<GetSuppliersQuery, Result<PaginationResponse<GetSuppliersResponse>>>
{
    private readonly IGenericRepository<Domain.Entities.Supplier.Supplier> _supplierRepo =
        unitOfWork.GetRepository<Domain.Entities.Supplier.Supplier>();

    public override async Task<Result<PaginationResponse<GetSuppliersResponse>>> Handle(
        GetSuppliersQuery request,
        CancellationToken cancellationToken
    )
    {
        var query = await _supplierRepo.GetAllQueryableAsync(d => !d.Is_Deleted);

        if (!string.IsNullOrWhiteSpace(request.Name))
            query = query.Where(a => a.Name.Contains(request.Name));

        if (request.SupplierType.HasValue)
            query = query.Where(a => a.SupplierType == request.SupplierType.Value);

        var count = await query.CountAsync(cancellationToken);

        var response = query
            .Select(a => mapper.Map<GetSuppliersResponse>(a))
            .Paginate(request)
            .ToList();

        return Result<PaginationResponse<GetSuppliersResponse>>.Success(
            new PaginationResponse<GetSuppliersResponse> { Data = response, Count = count }
        );
    }
}


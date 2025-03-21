using AutoMapper;
using Luftborn.Application.Common;
using Luftborn.Domain.Dtos;
using Microsoft.EntityFrameworkCore;

namespace Luftborn.Application.Features.Supplier.Commands.Update;

public class UpdateSupplierCommandHandler(IUnitOfWork unitOfWork, IMapper mapper)
 : BaseHandler<UpdateSupplierCommand, Result<string>>
{
    private readonly IGenericRepository<Domain.Entities.Supplier.Supplier> _supplierRepository = unitOfWork.GetRepository<Domain.Entities.Supplier.Supplier>();
    public override async Task<Result<string>> Handle(UpdateSupplierCommand request, CancellationToken cancellationToken)
    {
        var supplier = await _supplierRepository.FindAsync(
            s => s.Id == request.Id,
            Include: s => s.Include(s => s.Contacts));
        
        if (supplier == null)
            return Result<string>.Fail("Not Found");

        mapper.Map(request, supplier);

        await unitOfWork.SaveChangesAsync();

        return Result<string>.Success("Successfully Updated");
    }
}
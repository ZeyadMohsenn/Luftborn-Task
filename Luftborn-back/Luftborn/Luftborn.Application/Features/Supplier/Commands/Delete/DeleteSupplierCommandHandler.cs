using Luftborn.Application.Common;
using Luftborn.Domain.Dtos;

namespace Luftborn.Application.Features.Supplier.Commands.Delete;

public class DeleteSupplierCommandHandler(IUnitOfWork unitOfWork)
    : BaseHandler<DeleteSupplierCommand, Result<bool>>
{
    private readonly IGenericRepository<Domain.Entities.Supplier.Supplier> _supplierRepo = unitOfWork.GetRepository<Domain.Entities.Supplier.Supplier>();
    public override async Task<Result<bool>> Handle(DeleteSupplierCommand request, CancellationToken cancellationToken)
    {
        var supplier = await _supplierRepo.FindAsync(
            s => s.Id == request.Id);
        
        if (supplier == null)
            return Result<bool>.Fail("Supplier not found");
        
        supplier.Is_Deleted = true;
        
        int result = await unitOfWork.SaveChangesAsync();
        if (result <= 0)
            return Result<bool>.Fail("Failed to delete supplier");

        return Result<bool>.Success(true, "Supplier deleted successfully");
    }
}

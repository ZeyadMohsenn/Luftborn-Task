using Luftborn.Application.Features.Supplier.Commands.Create;
using Luftborn.Application.Features.Supplier.Commands.Update;
using Luftborn.Application.Features.Supplier.Queries.GetAll;
using Luftborn.Application.Features.Supplier.Queries.GetById;

namespace Luftborn.Application.Mapping.Supplier;

public class SupplierProfile : MappingProfileBase
{
    public SupplierProfile()
    {
        CreateMap<CreateSupplierCommand, Domain.Entities.Supplier.Supplier>()
            .ForMember(dest => dest.Contacts, opt => opt.MapFrom(src => src.Contacts.Select(x => new Domain.Entities.Supplier.Contact
            {
                Name = x.Name,
                PhoneNumber = x.PhoneNumber,
                Email = x.Email
            })));
        
        CreateMap<UpdateSupplierCommand, Domain.Entities.Supplier.Supplier>()
            .IncludeBase<CreateSupplierCommand, Domain.Entities.Supplier.Supplier>();
        
        CreateMap<Domain.Entities.Supplier.Supplier, GetSuppliersResponse>();
        CreateMap<Domain.Entities.Supplier.Supplier, GetSupplierResponse>();       
        CreateMap<Domain.Entities.Supplier.Contact, ContactsDto>();
    }
}


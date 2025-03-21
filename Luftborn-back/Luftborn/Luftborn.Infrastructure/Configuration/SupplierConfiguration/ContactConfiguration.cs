using Luftborn.Domain.Entities.Supplier;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Luftborn.Infrastructure.Configuration.SupplierConfiguration;

public class ContactConfiguration : BaseConfiguration<Contact>
{
    public override void Configure(EntityTypeBuilder<Contact> builder)
    {
        base.Configure(builder);
        builder.Property(x => x.PhoneNumber).IsRequired();
        builder.Property(x => x.Name).IsRequired();
    }
}

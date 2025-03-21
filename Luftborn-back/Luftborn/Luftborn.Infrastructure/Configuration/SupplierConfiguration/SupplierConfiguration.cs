using Luftborn.Domain.Entities.Supplier;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Luftborn.Infrastructure.Configuration.SupplierConfiguration;


public class SupplierConfiguration : BaseConfiguration<Supplier>
{
    public override void Configure(EntityTypeBuilder<Supplier> builder)
    {
        base.Configure(builder);
        builder.Property(x => x.SupplierType).IsRequired();
        builder.Property(x => x.Name).IsRequired();

        builder.HasMany(x => x.Contacts)
               .WithOne(x => x.Supplier)
               .HasForeignKey(x => x.SupplierId);
        
    }
}
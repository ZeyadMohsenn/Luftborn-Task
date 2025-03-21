using Luftborn.Application.Common;
using Luftborn.Domain.Entities.Supplier;
using Luftborn.Domain.Enums;
using Luftborn.Infrastructure.Context;

namespace Luftborn.Infrastructure.Seed;

public class SeedDatabase
{
    public static async Task Seed(IUnitOfWork<AppDbContext> unitOfWork, AppDbContext context)
    {
        // Check if any suppliers exist
        if (!context.Set<Supplier>().Any())
        {
            var suppliers = GetSuppliers();

            await context.Set<Supplier>().AddRangeAsync(suppliers);
        }
        await unitOfWork.SaveChangesAsync();
    }

    private static List<Supplier> GetSuppliers()
    {
        var suppliers = new List<Supplier>();

        for (int i = 1; i <= 11; i++)
        {
            var supplier = new Supplier
            {
                Id = Guid.NewGuid(),
                Name = $"Supplier {i}",
                SupplierType = (i % 2 == 0) ? SupplierType.Distributor : SupplierType.Manufacturer,
                Description = $"Description for Supplier {i}",
                Notes = $"Notes for Supplier {i}",
                Address = $"Address for Supplier {i}",
                Created_At = DateTime.UtcNow,
                Created_By = Guid.NewGuid(),
                Contacts = GetContactsForSupplier(i), // Seed contacts for this supplier
            };

            suppliers.Add(supplier);
        }

        return suppliers;
    }

    private static List<Contact> GetContactsForSupplier(int supplierNumber)
    {
        var contacts = new List<Contact>();

        for (int j = 1; j <= 2; j++)
        {
            contacts.Add(
                new Contact
                {
                    Id = Guid.NewGuid(),
                    Name = $"Supplier {supplierNumber} Contact {j}",
                    PhoneNumber = $"0100{supplierNumber:000}{j:00}",
                    Email = $"contact{j}@supplier{supplierNumber}.com",
                    Created_At = DateTime.UtcNow,
                    Created_By = Guid.NewGuid(),
                    
                }
            );
        }

        return contacts;
    }
}

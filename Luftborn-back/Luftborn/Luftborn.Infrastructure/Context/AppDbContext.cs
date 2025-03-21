using System.Reflection;
using Luftborn.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Luftborn.Infrastructure.Context;

public class AppDbContext(DbContextOptions options)
        : DbContext(options)
{
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        base.OnModelCreating(modelBuilder);
    }

    public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        var entries = ChangeTracker.Entries<BaseEntity>();
        foreach (var entry in entries)
        {
            switch (entry.State)
            {
                case EntityState.Modified:
                    entry.Entity.Modified_At = DateTime.UtcNow;
                    entry.Entity.Modified_By =
                        (
                            entry.Entity.Modified_By is not null
                            && entry.Entity.Modified_By != Guid.Empty
                        )
                            ? entry.Entity.Modified_By
                            : Guid.Empty;
                    break;
                case EntityState.Added:
                    entry.Entity.Created_At = DateTime.UtcNow;
                        entry.Entity.Created_By = entry.Entity.Created_By != Guid.Empty
                            ? entry.Entity.Created_By
                            : Guid.Empty;
                    break;
                default:
                    break;
            }
        }

        return base.SaveChangesAsync(cancellationToken);
    }

}



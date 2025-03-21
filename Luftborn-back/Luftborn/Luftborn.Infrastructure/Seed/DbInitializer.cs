using Luftborn.Application.Common;
using Luftborn.Infrastructure.Context;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Luftborn.Infrastructure.Seed;

public static class DbInitializer
{
    public static async Task InitializeDatabase(this IApplicationBuilder app)
    {
        try
        {
            using var scope = app
                .ApplicationServices.GetRequiredService<IServiceScopeFactory>()
                .CreateScope();

            await scope.ServiceProvider.GetRequiredService<AppDbContext>().Database.MigrateAsync();

            var unitOfWork = scope.ServiceProvider.GetRequiredService<IUnitOfWork<AppDbContext>>();
            var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();

            await SeedDatabase.Seed(unitOfWork, context);
        }
        catch (Exception ex)
        {
            throw new Exception(ex.Message, ex.InnerException);
        }
    }
}
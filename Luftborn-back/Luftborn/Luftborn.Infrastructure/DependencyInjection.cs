using Luftborn.Application.Common;
using Luftborn.Infrastructure.Context;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Luftborn.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(
        this IServiceCollection services,
        IConfiguration config
    )
    {
    return services
        .AddSingleton<IHttpContextAccessor, HttpContextAccessor>()
        .AddHttpClient()
        .AddLocalization()
        .Configure<RequestLocalizationOptions>(_ => LocalizationConfig.GetLocalizationOptions())
        .RegisterUnitOfWork<AppDbContext>();
            //.AddServices();
    }

    public static IServiceCollection RegisterUnitOfWork<TContext>(this IServiceCollection services)
        where TContext : DbContext
    {
        services.AddScoped(typeof(IUnitOfWork<>), typeof(UnitOfWork<>));
        services.AddScoped<IUnitOfWork, UnitOfWork<TContext>>();
        services.AddScoped<IUnitOfWork<TContext>, UnitOfWork<TContext>>();
        return services;
    }


}

public static class Startup
{
    public static IApplicationBuilder UseInfrastructure(this IApplicationBuilder app)
    {
        return app
            .UseRequestCulture()
            .UseStaticFiles()
            .UseRouting()
            .UseAuthentication()
            .UseAuthorization()
            .UseCors("CorsPolicy");
    }

    private static IApplicationBuilder UseRequestCulture(this IApplicationBuilder app)
    {
        var localizationOptions = LocalizationConfig.GetLocalizationOptions();
        app.UseRequestLocalization(localizationOptions);
        return app;
    }
}

public static class LocalizationConfig
{
    public static RequestLocalizationOptions GetLocalizationOptions()
    {
        var supportedCultures = new[] { "en", "ar" };
        return new RequestLocalizationOptions()
            .SetDefaultCulture(supportedCultures[0])
            .AddSupportedCultures(supportedCultures)
            .AddSupportedUICultures(supportedCultures);
    }
}


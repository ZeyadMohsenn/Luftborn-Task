using FluentValidation;
using Luftborn.Application.Behaviors;
using Luftborn.Application.Mapping;
using MediatR;
using Microsoft.Extensions.DependencyInjection;

namespace Luftborn.Application;

public static class DependencyInjection
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        // Register Mediator
        services.AddMediatR(options =>
        {
            options.RegisterServicesFromAssembly(typeof(DependencyInjection).Assembly);

            // Register validation pipeline behavior
            options.AddBehavior(typeof(IPipelineBehavior<,>), typeof(ValidationPipelineBehavior<,>));
        });

        // Register AutoMapper Profiles
        services.AddAutoMapper(typeof(MappingProfileBase));

        // Register validators
        services.AddValidatorsFromAssembly(typeof(DependencyInjection).Assembly, includeInternalTypes: true);

        // Register Services
        services.AddServices();

        return services;
    }

    public static IServiceCollection AddServices(this IServiceCollection services)
    {
        return services;
    }
}


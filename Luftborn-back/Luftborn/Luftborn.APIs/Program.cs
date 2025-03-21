using System.Text.Json.Serialization;
using Luftborn.APIs.Extensions;
using Luftborn.APIs.Middleware;
using Luftborn.Application;
using Luftborn.Infrastructure;
using Luftborn.Infrastructure.Context;
using Luftborn.Infrastructure.Seed;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
var builder = WebApplication.CreateBuilder(args);

var configuration = builder.Configuration;

builder
    .Services.AddControllers()
    .AddJsonOptions(options =>
    {
      options.JsonSerializerOptions.NumberHandling = JsonNumberHandling.AllowReadingFromString;
    });

builder.Services.AddCors(options =>
{
  options.AddPolicy(
      "CorsPolicy",
      configurePolicy =>
      {
        var allowedOrigins = configuration.GetSection("AllowedOrigins").Get<string[]>();
        configurePolicy.AllowAnyMethod().WithOrigins(allowedOrigins!).AllowAnyHeader();
      }
  );
});

builder.Services.Configure<ApiBehaviorOptions>(opt =>
{
  opt.InvalidModelStateResponseFactory = ActionContext =>
  {
    var errors = ActionContext
        .ModelState.Where(a => a.Value!.Errors.Count > 0) // Only include fields with validation errors.
        .SelectMany(z => z.Value!.Errors) // Flatten the collection of errors.
        .Select(x => x.ErrorMessage) // Extract the error message strings.
        .ToList(); // Convert to a list of error messages.

    return new BadRequestObjectResult(string.Join(",\n", errors));
  };
});

builder.Services.AddEndpointsApiExplorer();

builder.Services.AddAPIExtensions();

builder.Services.AddDbContext<AppDbContext>(options =>
{
  options.UseSqlServer(configuration.GetConnectionString("DefaultConnection"));
});

builder.AddApplicationConfigurations();

builder.Services.AddInfrastructure(configuration).AddApplication();

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();

app.UseMiddleware<ExceptionHandlerMiddleWare>();

app.UseMiddleware<LocalizationMiddleWare>();

app.UseInfrastructure();

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

await app.InitializeDatabase();
app.Run();



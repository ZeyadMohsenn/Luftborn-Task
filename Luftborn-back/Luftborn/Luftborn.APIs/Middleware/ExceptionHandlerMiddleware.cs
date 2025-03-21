using Luftborn.Application.Exception;
using Luftborn.Domain.Dtos;

namespace Luftborn.APIs.Middleware;

public class ExceptionHandlerMiddleWare(RequestDelegate next)
{
    private readonly RequestDelegate _next = next;

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (ValidationException ex)
        {
            context.Response.StatusCode = StatusCodes.Status200OK;
            await context.Response.WriteAsJsonAsync(Result<object>.Fail([.. ex.Errors]));
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
            //TODO: Log the exception

            context.Response.StatusCode = StatusCodes.Status200OK;
            await context.Response.WriteAsJsonAsync(Result<object>.Fail("An error occurred while processing your request"));
        }
    }
}
using Luftborn.Application.Dto;
using Luftborn.Application.Features.Supplier.Commands.Create;
using Luftborn.Application.Features.Supplier.Commands.Delete;
using Luftborn.Application.Features.Supplier.Commands.Update;
using Luftborn.Application.Features.Supplier.Queries.GetAll;
using Luftborn.Application.Features.Supplier.Queries.GetById;
using Luftborn.Domain.Dtos;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Luftborn.APIs.Controllers;
[AllowAnonymous]
public class SuppliersController(ISender sender) : BaseApiController
{
    private readonly ISender _mediator = sender;
    [HttpPost("Create")] 
    public async Task<ActionResult<Result<string>>> Create(CreateSupplierCommand command)
    {
        return BaseResponseHandler(await _mediator.Send(command));
    }
    [HttpGet("GetAll")]
    public async Task<ActionResult<Result<PaginationResponse<GetSuppliersResponse>>>> GetAll([FromQuery] GetSuppliersQuery query)
    {
        return BaseResponseHandler(await _mediator.Send(query));
    }
    [HttpGet("GetById")]
    public async Task<ActionResult<Result<GetSupplierResponse>>> GetById([FromQuery]GetSupplierQuery query)
    {
        return BaseResponseHandler(await _mediator.Send(query));
    }
    [HttpPut("Update")]
    public async Task<ActionResult<Result<string>>> Update(UpdateSupplierCommand command)
    {
        return BaseResponseHandler(await _mediator.Send(command));
    }
    [HttpDelete("Delete")]
    public async Task<ActionResult<Result<bool>>> Delete(DeleteSupplierCommand command)
    {
        return BaseResponseHandler(await _mediator.Send(command));
    }
}

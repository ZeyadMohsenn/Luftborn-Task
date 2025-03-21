using Luftborn.Application.Helper;
using MediatR;

namespace Luftborn.Application.Features;

public abstract class BaseHandler<TRequest, TResponse>() : IRequestHandler<TRequest, TResponse>
    where TRequest : IRequest<TResponse>
{
    protected bool IsArabic => CultureHelper.CurrentLanguage == "ar";

    public abstract Task<TResponse> Handle(TRequest request, CancellationToken cancellationToken);
}


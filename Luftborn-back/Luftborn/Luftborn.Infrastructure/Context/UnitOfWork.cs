using Luftborn.Application.Common;
using Luftborn.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Luftborn.Infrastructure.Context;

public class UnitOfWork<TContext>(TContext context) : IUnitOfWork<TContext>, IUnitOfWork
    where TContext : DbContext
{
    private readonly Dictionary<Type, object> _repositories = [];

    public TContext Context { get; } = context;

    public void Dispose()
    {
        Context.Dispose();
        _repositories.Clear();
    }

    public IGenericRepository<T> GetRepository<T>()
        where T : BaseEntity
    {
        var type = typeof(T);
        if (!_repositories.ContainsKey(type))
            _repositories[type] = new GenericRepository<T, TContext>(Context);
        return (IGenericRepository<T>)_repositories[type];
    }

    public Task<int> SaveChangesAsync()
    {
        return Context.SaveChangesAsync();
    }
}

using Luftborn.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Luftborn.Application.Common;

public interface IUnitOfWork : IDisposable
{
    IGenericRepository<T> GetRepository<T>()
        where T : BaseEntity;
    Task<int> SaveChangesAsync();
}

public interface IUnitOfWork<TContext> : IUnitOfWork
    where TContext : DbContext
{
    TContext Context { get; }
}


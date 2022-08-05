using G4L.UserManagement.BL.Interfaces;
using G4L.UserManagement.DA;
using G4L.UserManagement.Shared;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace G4L.UserManagement.Infrustructure.Repositories
{
    public class Repository<TEntity> : IRepository<TEntity> where TEntity : BaseEntity
    {
        private readonly DatabaseContext _databaseContext;
        public Repository(DatabaseContext databaseContext)
        {
            _databaseContext = databaseContext;
        }
        public async Task CreateAsync(TEntity entity)
        {
            await _databaseContext.Set<TEntity>().AddAsync(entity);
            await _databaseContext.SaveChangesAsync();
        }

        public async Task DeleteAsync(Guid id)
        {
            var entity = await _databaseContext.Set<TEntity>().FindAsync(id);
            _databaseContext.Set<TEntity>().Remove(entity);
            await _databaseContext.SaveChangesAsync();
        }

        public virtual async Task UpdateAsync(TEntity entity)
        {
            _databaseContext.Entry(entity).State = EntityState.Modified;
            await _databaseContext.SaveChangesAsync();
        }

        public async Task<TEntity> GetByIdAsync(Guid id)
        {
            return await _databaseContext.Set<TEntity>().FindAsync(id);
        }

        public virtual async Task<IEnumerable<TEntity>> ListAsync()
        {
            return await Task.Run(() => {
                return _databaseContext.Set<TEntity>().AsEnumerable();
            });
        }

        public virtual async Task<IEnumerable<TEntity>> ListAsync(Expression<Func<TEntity, bool>> expression)
        {
            return await Task.Run(() => {
                return _databaseContext.Set<TEntity>().Where(expression)
                    .AsNoTracking().AsEnumerable();
            });
        }
    }
}

using G4L.UserManagement.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace G4L.UserManagement.BL.Interfaces
{
    public interface IRepository<TEntity> where TEntity : BaseEntity
    {
        Task CreateAsync(TEntity entity);
        Task UpdateAsync(TEntity entity);
        Task DeleteAsync(Guid id);
        Task<TEntity> GetByIdAsync(Guid id);
        //Task<TEntity> GetByEmailAsync(string email);
        Task<IEnumerable<TEntity>> ListAsync();
        Task<IEnumerable<TEntity>> ListAsync(Expression<Func<TEntity, bool>> expression);
    }
}

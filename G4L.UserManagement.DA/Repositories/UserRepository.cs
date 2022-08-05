using G4L.UserManagement.BL.Entities;
using G4L.UserManagement.BL.Interfaces;
using G4L.UserManagement.DA;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G4L.UserManagement.Infrustructure.Repositories
{
    public class UserRepository : Repository<User>, IUserRepository
    {
        private readonly DatabaseContext _databaseContext;
        public UserRepository(DatabaseContext databaseContext) : base(databaseContext)
        {
            _databaseContext = databaseContext;
        }

        public async Task<User> GetByUserAsync(string email, string password)
        {
            return await Task.Run(() => { 
                return _databaseContext.Set<User>().Where(x => x.Email == email && x.Password == password).FirstOrDefaultAsync();
            });
        }

        public async Task<IEnumerable<User>> ListAsync()
        {
            return await Task.Run(() =>
            {
                return _databaseContext.Set<User>()
                    .Include("Leaves")
                    // .ThenInclude("Documents")
                    .AsEnumerable();
            });
        }
    }
}

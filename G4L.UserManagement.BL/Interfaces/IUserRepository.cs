using G4L.UserManagement.BL.Entities;
using G4L.UserManagement.BL.Enum;
using G4L.UserManagement.BL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G4L.UserManagement.BL.Interfaces
{
    public interface IUserRepository : IRepository<User>
    {
        Task<User> GetByUserByEmailAsync(string email);
        Task CreateUserAsync(RegisterRequest user);
        Task<IEnumerable<User>> GetUsersByRoleAsync(Role role);
    }
}

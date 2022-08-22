using G4L.UserManagement.BL.Entities;
using G4L.UserManagement.BL.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace G4L.UserManagement.BL.Interfaces
{
    public interface IUserService
    {
        Task RegisterUserAsync(RegisterRequest user);
        Task<AuthenticateResponse> AuthenticateUserAsync(AuthenticateRequest model);
        Task<IEnumerable<User>> GetAllUsersAsync();
        Task<User> GetUserByIdAsync(Guid id);
        Task UpdateUserAsync(UpdateRequest user);
        Task DeleteUserAsync(Guid id);
        Task<User> GetUserAsync(string email);
    }
}

using G4L.UserManagement.BL.Entities;
using G4L.UserManagement.BL.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G4L.UserManagement.Infrustructure.Services
{
    public class UserService : IUserService 
    {
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task CreateNewUserAsync(User user)
        {
            await _userRepository.CreateAsync(user);
        }

        public async Task<IEnumerable<User>> GetAllUsersAsync()
        {
            return await _userRepository.ListAsync();
        }

        public async Task DeleteUserAsync(Guid id)
        {
            await _userRepository.DeleteAsync(id);
        }


         public async Task<User> GetUserAsync(string email, string password)
        {
            return await _userRepository.GetByUserAsync(email, password);
        }


        public async Task<User> GetUserByIdAsync(Guid id)
        {
            return await _userRepository.GetByIdAsync(id);
        }

        public Task UpdateUserAsync(User entity)
        {
            return _userRepository.UpdateAsync(entity);

        }
    }
}

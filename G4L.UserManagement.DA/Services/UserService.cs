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

        async Task IUserService.DeleteUserAsync(Guid id)
        {
            await _userRepository.DeleteAsync(id);
        }

        /*Task<User> IUserService.GetUserByEmailAsync(User user)
        {
            throw new NotImplementedException();
        }*/

        async Task<User> IUserService.GetUserByIdAsync(Guid id)
        {
            return await _userRepository.GetByIdAsync(id);
        }

        Task IUserService.UpdateUserAsync(User entity)
        {
           return _userRepository.UpdateAsync(entity);

        }
    }
}

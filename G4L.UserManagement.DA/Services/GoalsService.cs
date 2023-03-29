using AutoMapper;
using G4L.UserManagement.BL.Entities;
using G4L.UserManagement.BL.Interfaces;
using G4L.UserManagement.BL.Models.Request;
using G4L.UserManagement.DA.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G4L.UserManagement.DA.Services
{
    public class GoalsService : IGoalService
    {
        private readonly IGoalRepository _goalRepository;
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public GoalsService(IGoalRepository goalRepository, IUserRepository userRepository, IMapper mapper)
        {
            _goalRepository = goalRepository;
            _userRepository = userRepository;
            _mapper = mapper;
        }

        public async Task CreateUserGoalAsync(CreateGoalRequest goalRequest)
        {
            var goal = _mapper.Map<Goal>(goalRequest);
            await _goalRepository.AddAsync(goal);
        }

        public async Task<List<Goal>> GetAllUserGoalsAsync(Guid UserId)
        {
            var allUserGoals = await _goalRepository.ListAsync();
            return _mapper.Map<List<Goal>>(allUserGoals);
        }

        public Task<User> UpdateUserGoal(Guid UserId, UpdateGoalRequest request)
        {
            throw new NotImplementedException();
        }
    }
}

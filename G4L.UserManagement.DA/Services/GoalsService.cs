using G4L.UserManagement.BL.Entities;
using G4L.UserManagement.BL.Interfaces;
using G4L.UserManagement.BL.Models.Request;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G4L.UserManagement.DA.Services
{
    public class GoalsService : IGoalService
    {
        public Task<User> CreateUserGoal(Guid UserId, CreateGoalRequest request)
        {
            throw new NotImplementedException();
        }

        public Task<List<Goal>> GetAllUserGoals(Guid UserId)
        {
            throw new NotImplementedException();
        }

        public Task<User> UpdateUserGoal(Guid UserId, UpdateGoalRequest request)
        {
            throw new NotImplementedException();
        }
    }
}

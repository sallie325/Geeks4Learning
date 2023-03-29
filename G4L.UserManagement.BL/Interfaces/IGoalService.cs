using G4L.UserManagement.BL.Entities;
using G4L.UserManagement.BL.Models.Request;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G4L.UserManagement.BL.Interfaces
{
    public interface IGoalService
    {
        Task CreateUserGoalAsync(CreateGoalRequest goalRequest);
        Task<List<Goal>> GetAllUserGoalsAsync(Guid UserId);
        Task<User> UpdateUserGoal(Guid UserId, UpdateGoalRequest request);
    }
}

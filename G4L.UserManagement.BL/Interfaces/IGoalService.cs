using G4L.UserManagement.BL.Entities;
using G4L.UserManagement.BL.Models.Request;
using G4L.UserManagement.BL.Models.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G4L.UserManagement.BL.Interfaces
{
    public interface IGoalService
    {
        Task<GoalResponse> CreateUserGoalAsync(GoalRequest goalRequest);
        Task<List<GoalResponse>> GetUserGoalsAsync(Guid UserId);
        Task<GoalResponse> UpdateGoal(GoalRequest goalRequest);
        Task<List<GoalResponse>> GetAllGoalsAsync();
    }
}

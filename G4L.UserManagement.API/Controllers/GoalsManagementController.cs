using G4L.UserManagement.API.Authorization;
using G4L.UserManagement.BL.Entities;
using G4L.UserManagement.BL.Enum;
using G4L.UserManagement.BL.Interfaces;
using G4L.UserManagement.BL.Models.Request;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace G4L.UserManagement.API.Controllers
{
  
    [ApiController]
    [Route("api/[controller]")]
    public class GoalsManagementController : ControllerBase
    {
        private readonly IGoalService _goalService;
        private readonly IUserService _userService;

        public GoalsManagementController(IGoalService goalService, IUserService userService)
        {
            _goalService = goalService;
            _userService = userService;
        }


        [HttpGet]
        [Route("{UserId}")]

        public async Task<IActionResult> GetAllGoals([FromRoute] Guid UserId)
        {
            var user = await _userService.GetUserByIdAsync(UserId);
            if (user == null)
            {
                return NotFound("User not found");
            }

            var allUserGoals = await _goalService.GetAllUserGoalsAsync(UserId);
            if (!allUserGoals.Any())
            {
                return Ok("No goals present");
            }

            return Ok(allUserGoals);
        }


        [HttpPost]
        [Route("AddGoal")]
        public async Task<IActionResult> AddGoalsync([FromBody] CreateGoalRequest goalRequest)
        {
            await _goalService.CreateUserGoalAsync(goalRequest);
            return Ok();
        }


        [HttpPut]
        [Route("update")]
        public async Task<IActionResult> UpdateGoal([FromBody] UpdateGoalRequest goal)
        {
            if(goal == null) return BadRequest("Attempting to update with a null goal object");
            if (goal.Id.Equals(null)) return BadRequest("Goal can not be found");
            var updatedGoal = await _goalService.UpdateUserGoal(goal);
            return Ok(updatedGoal);
        }
    }
}

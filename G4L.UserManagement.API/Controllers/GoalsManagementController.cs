using G4L.UserManagement.API.Authorization;
using G4L.UserManagement.BL.Entities;
using G4L.UserManagement.BL.Enum;
using G4L.UserManagement.BL.Interfaces;
using G4L.UserManagement.BL.Models.Request;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace G4L.UserManagement.API.Controllers
{
  
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]

    public class GoalsManagementController : ControllerBase
    {
        private readonly IGoalService _goalService;

        public GoalsManagementController(IGoalService goalService)
        {
            _goalService = goalService;
        }


        [HttpGet]
        [Route("{UserId}")]

        public async Task<IActionResult> GetAllGoals([FromRoute] Guid UserId)
        {
            var allUserGoals = await _goalService.GetAllUserGoalsAsync(UserId);
            return Ok(allUserGoals);
        }


        [HttpPost]
        [Authorize(Role.Learner)]
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

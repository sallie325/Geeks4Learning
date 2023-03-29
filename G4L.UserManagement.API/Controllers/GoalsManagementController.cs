using G4L.UserManagement.BL.Entities;
using G4L.UserManagement.BL.Interfaces;
using G4L.UserManagement.BL.Models.Request;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace G4L.UserManagement.API.Controllers
{
  
    [ApiController]
    [Route("api/[controller]")]  //https://geek4Learning.com/api/GoalsManagement
    public class GoalsManagementController : ControllerBase
    {
        private readonly IGoalService _goalService;

        public GoalsManagementController(IGoalService goalService)
        {
            _goalService = goalService;
        }


        [HttpGet]
        [Route("{UserId:Guid}")]  
        public async Task<IActionResult> GetAllGoals([FromRoute] Guid UserId)
        {
            var allUserGoals = await _goalService.GetAllUserGoals(UserId);
            return Ok(allUserGoals);
        }


        [HttpPost]
        [Route("AddGoal/{UserId: Guid}")]
        public async Task<IActionResult> AddGoal([FromRoute] Guid UserId, [FromBody] CreateGoalRequest goal)
        {
            var createdGoal = await _goalService.CreateUserGoal(UserId, goal);
            return Ok(createdGoal);
        }


        [HttpPut]
        [Route("updateGoal/{UserId: Guid}")]
        public async Task<IActionResult> UpdateGoal([FromRoute] Guid UserId, [FromBody] UpdateGoalRequest goal)
        {
            if(goal == null) return BadRequest("Attempting to update with a null goal object");
            if (goal.Id.Equals(null)) return BadRequest("Goal can not be found");
            var updatedGoal = await _goalService.UpdateUserGoal(goal);
            return Ok(updatedGoal);
        }
    }
}

using G4L.UserManagement.BL.Entities;
using G4L.UserManagement.BL.Interfaces;
using G4L.UserManagement.BL.Models.Request;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace G4L.UserManagement.API.Controllers
{
    [ApiController]
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
        [Route("AddGoal/{UserId}")]
        public async Task<IActionResult> AddGoal([FromRoute] Guid UserId, [FromBody] CreateGoalRequest goal)
        {
            var createdGoal = await _goalService.CreateUserGoal(UserId, goal);
            return Ok(createdGoal);
        }

        [HttpPut]
        [Route("updateGoal/{UserId}")]
        public async Task<IActionResult> UpdateGoal([FromRoute] Guid UserId, [FromBody] UpdateGoalRequest goal)
        {
            var updatedGoal = await _goalService.UpdateUserGoal(UserId, goal);
            return Ok();
        }
    }
}

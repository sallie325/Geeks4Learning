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
    [Authorize(Role.Admin, Role.Learner, Role.Super_Admin)]
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

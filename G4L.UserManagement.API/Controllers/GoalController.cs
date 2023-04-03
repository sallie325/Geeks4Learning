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
   //[Authorize(Role.Super_Admin, Role.Admin, Role.Learner, Role.Admin)]
    public class GoalController : ControllerBase
    {
        private readonly IGoalService _goalService;
        private readonly IUserService _userService;

        public GoalController(IGoalService goalService, IUserService userService)
        {
            _goalService = goalService;
            _userService = userService;
        }

        [HttpGet]
        [Route("{UserId}")]
        public async Task<IActionResult> GetAllUserGoals([FromRoute] Guid UserId)
        {
            return Ok(await _goalService.GetUserGoalsAsync(UserId));
        }

        [HttpGet]
        public async Task<IActionResult> GetAllGoals()
        {
            var goalList = await _goalService.GetAllGoalsAsync();
            return Ok(goalList);
        }

        [HttpGet]
        [Route("goalId")]
        public async Task<IActionResult> GetGoal([FromRoute] Guid goalId)
        {
            var goalList = await _goalService.GetAllGoalsAsync();
            return Ok(goalList);
        }

        [HttpPost]
       // [Authorize(Role.Learner)]
        [Route("AddGoal")]
        public async Task<IActionResult> AddGoalsync([FromBody] GoalRequest goalRequest)
        {
            var responseGoal = await _goalService.CreateUserGoalAsync(goalRequest);
            return Ok(responseGoal);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateGoal([FromBody] GoalRequest goal)
        {
            return Ok(await _goalService.UpdateGoal(goal));
        }
    }
}

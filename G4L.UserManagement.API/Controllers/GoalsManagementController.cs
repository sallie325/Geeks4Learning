﻿using G4L.UserManagement.API.Authorization;
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
    [Authorize]
    [Route("api/[controller]")]
    [Authorize(Role.Super_Admin, Role.Admin, Role.Learner, Role.Admin)]
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
        [Authorize(Role.Learner)]
        [Route("AddGoal")]
        public async Task<IActionResult> AddGoalsync([FromBody] CreateGoalRequest goalRequest)
        {
            await _goalService.CreateUserGoalAsync(goalRequest);
            return Ok();
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

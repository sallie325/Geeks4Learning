using G4L.UserManagement.BL.Entities;
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
        [HttpGet]
        [Route("{UserId:Guid}")]
        public async Task<IActionResult> GetAllGoals([FromRoute] Guid UserId)
        {
            return Ok();
        }

        [HttpPost]
        [Route("goal/{UserId: Guid}")]
        public async Task<IActionResult> AddGoal([FromRoute] Guid UserId, [FromBody] CreateGoal goal)
        {
            return Ok();
        }

        [HttpPut]
        [Route("updateGoal/{UserId: Guid}")]
        public async Task<IActionResult> UpdateGoal([FromRoute] Guid UserId, [FromBody] UpdateGoal goal)
        {
            return Ok();
        }
    }
}

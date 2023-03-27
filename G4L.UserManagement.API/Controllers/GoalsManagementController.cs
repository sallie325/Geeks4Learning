using G4L.UserManagement.BL.Entities;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace G4L.UserManagement.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GoalsManagementController : Controller
    {
        [HttpGet]
        public async Task<IActionResult> GetAllGoals()
        {
            return Ok();
        }

        [HttpPost]
        public async Task<IActionResult> AddGoal(int UserId, Goal goal)
        {
            return Ok();
        }

        public async Task<IActionResult> UpdateGoal(Goal goal)
        {
            return Ok();
        }
    }
}

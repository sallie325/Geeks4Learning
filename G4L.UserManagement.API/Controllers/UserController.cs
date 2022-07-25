using G4L.UserManagement.BL.Entities;
using G4L.UserManagement.BL.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;

namespace G4L.UserManagement.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly ILogger<UserController> _logger;
        private readonly IUserService _userService;

        public UserController(ILogger<UserController> logger, IUserService userService)
        {
            _logger = logger;
            _userService = userService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _userService.GetAllUsersAsync());
        }

        [HttpPost]
        public async Task<IActionResult> PostAsync(User user)
        {
           
            try
            {
                await _userService.CreateNewUserAsync(user);
                return Ok("succussfuly Added");
            }  
            catch(Exception)
            {
                return BadRequest("New user not added succussfuly");
            }
            
        }

        [HttpGet ("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
             var user =  await _userService.GetUserByIdAsync(id);
            if(user == null)
                return BadRequest("User Not Found");
            return Ok(user);
        }



    }
}

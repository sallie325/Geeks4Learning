using G4L.UserManagement.API.Authorization;
using G4L.UserManagement.BL.Enum;
using G4L.UserManagement.BL.Interfaces;
using G4L.UserManagement.BL.Models;
using G4L.UserManagement.DA;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;

namespace G4L.UserManagement.API.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly ILogger<UserController> _logger;
        private readonly IUserService _userService;
        private readonly DatabaseContext _databaseContext;

        public UserController(ILogger<UserController> logger, IUserService userService, DatabaseContext databaseContext)
        {
            _logger = logger;
            _userService = userService;
            _databaseContext = databaseContext;
        }

        [Authorize(Role.Admin)]
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _userService.GetAllUsersAsync());
        }

        // Role specific
        //[Authorize(Role.Admin)]
        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> PostAsync([FromBody] RegisterRequest user)
        {
            await _userService.RegisterUserAsync(user);
            return Ok("succussfuly Added");
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            var user = await _userService.GetUserByIdAsync(id);
            if (user == null)
                return BadRequest("User Not Found");
            return Ok(user);
        }


        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> LoginUser(AuthenticateRequest model)
        {
            var user = await _userService.AuthenticateUserAsync(model);
            if (user == null)
                return BadRequest("User Not Found");

            return Ok(user);
        }
    }
}

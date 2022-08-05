using G4L.UserManagement.BL.Entities;
using G4L.UserManagement.BL.Interfaces;
using G4L.UserManagement.DA;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace G4L.UserManagement.API.Controllers
{
    [ApiController]
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

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _userService.GetAllUsersAsync());
        }

        [HttpPost]
        public async Task<IActionResult> PostAsync([FromBody] User user)
        {

            try
            {
               
                var dbUser = await _userService.GetUserByIdAsync(user.Id);
                if (dbUser != null)
                {
                    return BadRequest("User already exists");
                }
                await _userService.CreateNewUserAsync(user);
                return Ok("succussfuly Added");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message + "New user not added succussfuly");
            }

        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            var user = await _userService.GetUserByIdAsync(id);
            if (user == null)
                return BadRequest("User Not Found");
            return Ok(user);
        }



        [HttpPost ("login")]
        public async Task<IActionResult> LoginUser(string email, string password)
        {
            var user =  _databaseContext.Users.Where(u => u.Email == email && u.Password == password).Select(u => new
            {
                u.Name,
                u.Surname,
                u.Email,
                u.Password,
                u.Roles,
                u.Career,


            }).FirstOrDefault();
            if (user == null)
                return BadRequest("User Not Found");

            return Ok(user);
        }




    }
}

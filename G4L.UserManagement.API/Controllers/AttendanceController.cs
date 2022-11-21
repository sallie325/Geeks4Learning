using G4L.UserManagement.API.Authorization;
using G4L.UserManagement.BL.Entities;
using G4L.UserManagement.BL.Enum;
using G4L.UserManagement.BL.Interfaces;
using G4L.UserManagement.BL.Models;
using G4L.UserManagement.DA.Services;
using G4L.UserManagement.Infrustructure.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;

namespace G4L.UserManagement.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AttendanceController : ControllerBase
    {
        private readonly ILogger<AttendanceController> _logger;
        private readonly IAttendanceService _attendanceService;
        public AttendanceController(ILogger<AttendanceController> logger, IAttendanceService attendanceService)
        {
            _logger = logger;
            _attendanceService = attendanceService;
        }
        [Authorize(Role.Admin, Role.Learner)]
        [HttpPost("attendanceRegister")]
        public async Task<IActionResult> PostAsync([FromBody] Attendance_Register attendanceRegister)
        {
            await _attendanceService.SigningAttendanceRegisterAsync(attendanceRegister);
            return Ok(attendanceRegister);
        }



        [Authorize(Role.Learner)]
        [HttpPut("updateAttendance")]
        public async Task<IActionResult> PutAsync([FromBody] UpdateAttendance learner)
        {
            await _attendanceService.UpdateAttendanceAsync(learner);
            return Ok(learner);
        }

        [AllowAnonymous]
        [HttpGet("{userId}")]
        public async Task<IActionResult> GetAsync(Guid userId)
        {
            var attendanceRegister = await _attendanceService.GetAttendanceRegisterAsync(userId);
            return Ok(attendanceRegister);
        }
        [Authorize(Role.Super_Admin, Role.Admin, Role.Trainer)]
        [HttpGet("attendance_pages")]
        public async Task<IActionResult> Get(int skip = 0, int take = 5)
        {
            return Ok(await _attendanceService.GetPagedAttendancesAsync(skip, take));
        }
    }
}

using G4L.UserManagement.API.Authorization;
using G4L.UserManagement.BL.Enum;
using G4L.UserManagement.BL.Interfaces;
using G4L.UserManagement.BL.Models;
using G4L.UserManagement.DA.Services;
using G4L.UserManagement.Infrustructure.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;

namespace G4L.UserManagement.API.Controllers
{
    public class AttendanceController : ControllerBase
    {
       private readonly ILogger<AttendanceController> _logger;
       private readonly IAttendanceService _attendanceService;

        public AttendanceController(ILogger<AttendanceController> logger, IAttendanceService attendanceService)
        {
            _logger = logger;
            _attendanceService = attendanceService;
        }

        [AllowAnonymous]
        [HttpPost("Register_Attendance")]
        public async Task<IActionResult> PostAsync([FromBody] Attendance_register attendance_Register)
        {
          
            await _attendanceService.RegisterAttendanceLeaveAsync(attendance_Register);
            return Ok(attendance_Register);
        }

        [AllowAnonymous]
        [HttpGet("Get_All_Attendance_Records")]
        public async Task<IActionResult> GetAllAttendanceAsync()
        {
            var AttendnanceRecords = await _attendanceService.GetAllAttendanceAsync();
            return Ok(AttendnanceRecords);
        }
    }
}

using G4L.UserManagement.API.Authorization;
using G4L.UserManagement.BL.Enum;
using G4L.UserManagement.BL.Interfaces;
using G4L.UserManagement.BL.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;

namespace G4L.UserManagement.API.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class LeaveController : ControllerBase
    {
        private readonly ILogger<LeaveController> _logger;
        private readonly ILeaveService _leaveService;

        public LeaveController(ILogger<LeaveController> logger, ILeaveService leaveService)
        {
            _logger = logger;
            _leaveService = leaveService;
        }

        [Authorize(Role.Learner)]
        [HttpPost]
        public async Task<IActionResult> PostAsync([FromBody] LeaveRequest leaveRequest)
        {
            _logger.Log(LogLevel.Information, $"applying for leave {leaveRequest.LeaveType}");
            await _leaveService.LeaveRequestAsync(leaveRequest);
            return Ok(leaveRequest);
        }

        [HttpGet("balances")]
        public async Task<IActionResult> GetAsync()
        {
            var balances = await _leaveService.GetLeaveBalancesAsync();
            return Ok();
        }

        [Authorize(Role.Learner)]
        [HttpGet("{userId}")]
        public async Task<IActionResult> GetAsync(Guid userId)
        {
            var leaveRequests = await _leaveService.GetLeaveRequestsAsync(userId);
            return Ok(leaveRequests);
        }

        [Authorize(Role.Learner)]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAsync([FromBody] LeaveRequest leaveRequest, Guid id)
        {
            await _leaveService.UpdateLeaveStatusAsync(id, leaveRequest.Status);
            return Ok();
        }

        //Itumeleng Koalane
        [HttpPost]
        public async Task<IActionResult> HalfDayAsync(HalfDayRequest halfDayRequest)
        {
            _logger.Log(LogLevel.Information, $"applying for half day leave {halfDayRequest}");
            await _leaveService.HalfDayRequestAsync(halfDayRequest);
            return Ok(halfDayRequest);
        }
    }
}

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
    public class IKMController : ControllerBase
    {
        private readonly ILogger<IKMController> _logger;
        private readonly IIKMIntegrationService _ikmService;

        public IKMController(ILogger<IKMController> logger, IIKMIntegrationService ikmService)
        {
            _logger = logger;
            _ikmService = ikmService;
        }

        //[Authorize(Role.Super_Admin, Role.Admin, Role.Trainer, Role.Learner)]
        [HttpGet()]
        public async Task<IActionResult> Get(DateTime startDate, DateTime endDate, IKMStatus status)
        {
            return Ok(await _ikmService.GetResultsForDateRangeAsync(startDate, endDate, status));
        }

        [Authorize(Role.Super_Admin, Role.Admin, Role.Trainer)]
        [HttpGet("attendance_pages")]
        public async Task<IActionResult> Get(int skip = 0, int take = 5)
        {
            return Ok(await _ikmService.GetResultsAsync(skip, take));
        }
    }
}

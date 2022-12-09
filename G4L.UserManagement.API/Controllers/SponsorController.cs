using G4L.UserManagement.API.Authorization;
using G4L.UserManagement.BL.Enum;
using G4L.UserManagement.BL.Interfaces;
using G4L.UserManagement.BL.Models.Request;
using G4L.UserManagement.Infrustructure.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace G4L.UserManagement.API.Controllers
{
    [ApiController]
    //[Authorize]
    [Route("api/[controller]")]
    public class SponsorController : ControllerBase
    {
        private readonly ILogger<LeaveController> _logger;
        private readonly ISponsorService _sponsorService;

        public SponsorController(ILogger<LeaveController> logger, ISponsorService sponsorService)
        {
            _logger = logger;
            _sponsorService = sponsorService;
        }

        //[Authorize(Role.Super_Admin, Role.Admin, Role.Trainer)]
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _sponsorService.GetAllAsync());
        }

        //[Authorize(Role.Super_Admin, Role.Admin, Role.Trainer)]
        [HttpGet("paged")]
        public async Task<IActionResult> Get(int skip = 0, int take = 5)
        {
            return Ok(await _sponsorService.GetPagedSponsorsAsync(skip, take));
        }
        
        [HttpGet("{id}/approvers")]
        public async Task<IActionResult> GetApprovers(Guid id)
        {
            return Ok(await _sponsorService.GetApproversByIdAsync(id));
        }
        
        [HttpGet("approvers/{userId}")]
        public async Task<IActionResult> GetApproversByUserId(Guid userId)
        {
            return Ok(await _sponsorService.GetSponsorByUserIdAsync(userId));
        }
        
        //[Authorize(Role.Super_Admin, Role.Admin, Role.Trainer)]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetAsync(Guid id)
        {
            return Ok(await _sponsorService.GetByIdAsync(id));
        }

        //[Authorize(Role.Super_Admin, Role.Admin)]
        [HttpPost]
        public async Task<IActionResult> PostAsync([FromBody] SponsorRequest leaveRequest)
        {
            await _sponsorService.AddSponsorAsync(leaveRequest);
            return Ok(leaveRequest);
        }

        //[Authorize(Role.Super_Admin, Role.Admin)]
        [HttpPut("{id}/trainers")]
        public async Task<IActionResult> AssignTrainerToSponsorAsync(Guid id, Guid trainerId, Guid adminId)
        {
            var sponsor = await _sponsorService.GetByIdAsync(id);
            sponsor.TrainerId = trainerId;
            sponsor.AdminId = adminId;
            await _sponsorService.UpdateApproversInformationAsync(sponsor);
            return Ok();
        }

        //[Authorize(Role.Super_Admin, Role.Admin)]
        [HttpPut("{id}/trainees")]
        public async Task<IActionResult> AssignGeeksToSponsorAsync([FromBody] List<Guid> traineesId, Guid id)
        {
            await _sponsorService.UpdateTraineesInformationAsync(id, traineesId);
            return Ok();
        }
    }
}
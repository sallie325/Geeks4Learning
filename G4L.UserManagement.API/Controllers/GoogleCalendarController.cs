using G4L.UserManagement.API.Authorization;
using G4L.UserManagement.BL.Entities;
using G4L.UserManagement.BL.Enum;
using G4L.UserManagement.BL.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace G4L.UserManagement.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GoogleCalendarController : ControllerBase
    {
        private readonly IGoogleCalendarService _googleCalendarService;

        public GoogleCalendarController(IGoogleCalendarService googleCalendarService)
        {
            _googleCalendarService = googleCalendarService;
        }

        [HttpGet("{calendarId}")]
        public async Task<IActionResult> GetAsync(string calendarId) {
            var publicHolidays = await _googleCalendarService.GetAllByCalendarIdAsync(calendarId);
            return Ok(publicHolidays);
        }
    }
}

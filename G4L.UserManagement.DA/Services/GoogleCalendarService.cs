using AutoMapper;
using G4L.UserManagement.BL.Interfaces;
using G4L.UserManagement.BL.Models.Response;
using G4L.UserManagement.Shared;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace G4L.UserManagement.DA.Services
{
    public class GoogleCalendarService : IGoogleCalendarService
    {
        private readonly IGoogleCalendarAPI _googleCalendarAPI;
        private readonly AppSettings _appSettings;
        private readonly IMapper _mapper;

        public GoogleCalendarService(IGoogleCalendarAPI googleCalendarAPI, IOptions<AppSettings> appSettings, IMapper mapper)
        {
            _googleCalendarAPI = googleCalendarAPI;
            _appSettings = appSettings.Value;
            _mapper = mapper;
        }

        public async Task<List<EventResponse>> GetAllByCalendarIdAsync(string calendarId)
        {
            var result = await _googleCalendarAPI.GetEventsByCalendarIdAsync(calendarId);
            var futureHolidays = result.Items.Where(x => Convert.ToDateTime(x.Start.Date) > DateTime.Now.AddDays(-1) && !x.Description.Contains("Observance"));
            return _mapper.Map<List<EventResponse>>(futureHolidays);
        }

    }
}

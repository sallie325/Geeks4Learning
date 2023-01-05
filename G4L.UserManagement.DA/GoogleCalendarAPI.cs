using G4L.UserManagement.BL.Interfaces;
using G4L.UserManagement.Shared;
using Google.Apis.Auth.OAuth2;
using Google.Apis.Calendar.v3;
using Google.Apis.Calendar.v3.Data;
using Google.Apis.Services;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using static Google.Apis.Calendar.v3.EventsResource;

namespace G4L.UserManagement.DA
{
    public class GoogleCalendarAPI : IGoogleCalendarAPI
    {
        private readonly CalendarService _calendarService;
        private readonly AppSettings _appSettings;

        public GoogleCalendarAPI(IOptions<AppSettings> appSettings)
        {
            _appSettings = appSettings.Value;
            _calendarService = GetCalendarServiceAsync(_appSettings.GoogleCalendarFileAccessKey).Result;
        }

        private async Task<CalendarService> GetCalendarServiceAsync(string filePath)
        {
            return await Task.Run(() =>
            {
                try
                {
                    string[] Scopes = {
                   CalendarService.Scope.Calendar,
                   CalendarService.Scope.CalendarEvents,
                   CalendarService.Scope.CalendarEventsReadonly,
                  };

                    GoogleCredential credential;
                    using (var stream = new FileStream(filePath, FileMode.Open, FileAccess.Read))
                    {
                        // As we are using admin SDK, we need to still impersonate user who has admin access
                        //  https://developers.google.com/admin-sdk/directory/v1/guides/delegation    
                        credential = GoogleCredential.FromStream(stream)
                         .CreateScoped(Scopes);
                    }

                    // Create Calendar API service.    
                    var service = new CalendarService(new BaseClientService.Initializer()
                    {
                        HttpClientInitializer = credential,
                        ApplicationName = "Calendar Sample",
                    });
                    return service;
                }
                catch (Exception ex)
                {
                    throw;
                }
            });
        }
        public async Task<Event> CreateEventAsync(Event body, string emailCalendarId)
        {
            InsertRequest request = new InsertRequest(_calendarService, body, emailCalendarId);
            return await request.ExecuteAsync();
        }

        public async Task<Events> GetEventsAsync()
        {
            // Define parameters of request.
            var calendar = _calendarService.Events.List(_appSettings.GoogleSAHolidayCalendarId);
            calendar.TimeMin = DateTime.Now;
            calendar.ShowDeleted = false;
            calendar.SingleEvents = true;
            calendar.OrderBy = ListRequest.OrderByEnum.StartTime;
            var response = await calendar.ExecuteAsync();


            //string eventsValue = "";
            // List events.    
            return response;

            //eventsValue = "Upcoming events:\n";

            //if (events.Items != null && events.Items.Count > 0)
            //{
            //    foreach (var eventItem in events.Items)
            //    {
            //        string when = eventItem.Start.DateTime.ToString();
            //        if (String.IsNullOrEmpty(when))
            //        {
            //            when = eventItem.Start.Date;
            //        }
            //        eventsValue += string.Format("{0} ({1})", eventItem.Summary, when) + "\n";
            //    }
            //    return eventsValue;
            //}
            //else
            //{
            //    return "No upcoming events found.";
            //}
        }

        public async Task<Events> GetEventsByCalendarIdAsync(string calendarId)
        {
            var calendar = _calendarService.Events.List(calendarId);
            calendar.TimeMin = DateTime.Now;
            calendar.ShowDeleted = false;
            calendar.SingleEvents = true;
            calendar.OrderBy = ListRequest.OrderByEnum.StartTime;
            return await calendar.ExecuteAsync();
            //return await GetEventsAsync();
        }
    }
}

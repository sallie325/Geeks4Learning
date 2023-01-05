using Google.Apis.Calendar.v3.Data;
using System.Threading.Tasks;
using static Google.Apis.Calendar.v3.EventsResource;

namespace G4L.UserManagement.BL.Interfaces
{
    public interface IGoogleCalendarAPI
    {
        Task<Event> CreateEventAsync(Event body, string emailCalendarId);
        //Task<Events> GetEventsAsync(ListRequest request);
        Task<Events> GetEventsAsync();
        Task<Events> GetEventsByCalendarIdAsync(string calendarId);
    }
}

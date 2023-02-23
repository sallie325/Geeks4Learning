using G4L.UserManagement.BL.Enum;
using G4L.UserManagement.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G4L.UserManagement.BL.Entities
{
    public class Attendance : BaseEntity
    {
        public Guid UserId { get; set; }
        public DateTime Date { get; set; } = DateTime.Now.Date;
        public AttendanceStatus Status { get; set; } = AttendanceStatus.Present;
        public TimeSpan ClockIn { get; set; } = DateTime.Now.TimeOfDay;
        public TimeSpan ClockOut { get; set; } = DateTime.Now.TimeOfDay;
        public List<Goal> Goals { get; set; }
    }
}

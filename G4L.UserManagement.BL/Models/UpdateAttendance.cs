using G4L.UserManagement.BL.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G4L.UserManagement.BL.Models
{
    public class UpdateAttendance
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public DateTime Date { get; set; }
        public TimeSpan ClockIn { get; set; }
        public TimeSpan ClockOut { get; set; }
        public AttendanceStatus Status { get; set; }

    }
}

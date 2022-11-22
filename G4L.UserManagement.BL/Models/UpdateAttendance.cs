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
        public DateTime Clockin_Time { get; set; }
        public DateTime Clockout_Time { get; set; }
        public AttendanceStatus Status { get; set; }
    }
}

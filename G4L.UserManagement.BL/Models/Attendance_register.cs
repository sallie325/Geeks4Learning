using G4L.UserManagement.BL.Entities;
using G4L.UserManagement.BL.Enum;
using G4L.UserManagement.BL.Models.Request;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G4L.UserManagement.BL.Models
{
    public class AttendanceRegister
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        //public  DateTime Date { get; set; }
        public AttendanceStatus Status { get; set; }
        //public DateTime ClockIn { get; set; }
        //public DateTime ClockOut { get; set; }
        public List<GoalRequest> Goals { get; set; }
    }
}

using G4L.UserManagement.BL.Entities;
using G4L.UserManagement.BL.Enum;
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
        public Guid userId { get; set; }
        public string AttendanceDate { get; set; } = DateTime.Now.ToString("MM/dd/yyyy");
        public string LoginTime { get; set; } = DateTime.Now.ToString("HH:mm");
        public string LogoutTime { get; set; } = DateTime.Now.ToString("HH:mm");
        public AttendanceStatus Status { get; set; } = AttendanceStatus.Present;
    }
}

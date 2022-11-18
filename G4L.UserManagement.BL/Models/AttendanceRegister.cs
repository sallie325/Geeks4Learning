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
     
        public Guid UserId { get; set; }
        public  string Date { get; set; }  = DateTime.Now.ToString("MM/dd/yyyy");
        public AttendanceStatus Status { get; set; }
        public string Clockin_Time { get; set; } = DateTime.Now.ToString("HH:mm");
        public string Clockout_Time { get; set; } = DateTime.Now.ToString("HH:mm");
        public string Goal_summary { get; set; }
        public string Goal_Description { get; set; }
        public string Time_Limit { get; set; } = DateTime.Now.ToString("HH:mm");


    }
}

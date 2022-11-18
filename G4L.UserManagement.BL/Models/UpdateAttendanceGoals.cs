using G4L.UserManagement.BL.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G4L.UserManagement.BL.Models
{
    public class UpdateAttendanceGoals
    {
        public Guid Id { get;set; }
        public string Goal_summary { get; set; }
        public string Goal_Description { get; set; }
        public string Time_Limit { get; set; } = DateTime.Now.ToString("HH:mm");
    }
}

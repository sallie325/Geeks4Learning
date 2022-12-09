using G4L.UserManagement.BL.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G4L.UserManagement.BL.Models.Request
{
    public class ApproverRequest
    {
        public Guid UserId { get; set; }
        public Role Role { get; set; }
        public Status status { get; set; }
        public string Comments { get; set; }
    }
}

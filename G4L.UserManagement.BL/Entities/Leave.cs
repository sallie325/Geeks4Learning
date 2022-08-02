using G4L.UserManagement.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G4L.UserManagement.BL.Entities
{
    public class Leave: BaseEntity
    {
        public string LeaveType { get; set; }
        public int DaysUsed { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int DaysUsed { get; set; }

        public ICollection<Document> Document { get; set; }
    }
}

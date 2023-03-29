using G4L.UserManagement.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G4L.UserManagement.BL.Entities
{
    public class GoalTask:BaseEntity
    {
        public string Description { get; set; }
        public bool IsCompleted { get; set; }
    }
}

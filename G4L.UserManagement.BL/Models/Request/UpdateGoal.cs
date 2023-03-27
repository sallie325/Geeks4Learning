using G4L.UserManagement.BL.Entities;
using G4L.UserManagement.BL.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G4L.UserManagement.BL.Models.Request
{
    public class UpdateGoal
    {
        public string GoalName { get; set; }
        public string GoalDescription { get; set; }
        public DateTime Duration { get; set; }
        public GoalStatus GoalStatus { get; set; }
        public string Comments { get; set; }
        public DateTime AddedTime { get; set; }
/*        public DateTime TimeLeft { get; set; }
        public DateTime CreatedTime { get; set; }*/
        public List<GoalTask> GoalTask { get; set; }
    }
}

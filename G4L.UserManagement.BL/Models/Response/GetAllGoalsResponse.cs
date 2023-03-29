using G4L.UserManagement.BL.Entities;
using G4L.UserManagement.BL.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G4L.UserManagement.BL.Models.Response
{
    public class GetAllGoalsResponse
    {
        public Guid GoalId { get; set; }
        public string GoalTitle { get; set; }
        public string Description { get; set; }
        public TimeSpan Duration { get; set; }
        public GoalStatus GoalStatus { get; set; }
        public int PauseCount { get; set; }
        public int ArchiveCount { get; set; }
        public Guid UserId { get; set; }
        public Guid AttendenceId { get; set; }
        public List<GoalComment> Comments { get; set; }
        public TimeSpan TimeLeft { get; set; }
        public List<GoalTask> GoalTasks { get; set; }
    }
}

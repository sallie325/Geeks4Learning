using G4L.UserManagement.BL.Enum;
using G4L.UserManagement.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G4L.UserManagement.BL.Entities
{
    public class Goal: BaseEntity
    {
        public Guid GoalId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public TimeSpan Duration { get; set; }
        public GoalStatus GoalStatus { get; set; }
        public int PauseCount { get; set; }
        public int ArchiveCount { get; set; }
        public List<GoalComment> Comments { get; set; }
        public TimeSpan TimeLeft { get; set; }
        public List<GoalTask> goalTasks { get; set; }
    }
}

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
        public int PausedCount { get; set; }
        public int ArchiveCount { get; set; }
        public GoalStatus GoalStatus { get; set; }
        public TimeSpan TimeRemaining { get; set; }
        public List<GoalComment> Comment { get; set; }
        public List<GoalTask> Tasks { get; set; }
        public Guid AttendenceId { get; set; }
        public Guid UserId { get; set; }
        public User User { get; set; }
    }
}

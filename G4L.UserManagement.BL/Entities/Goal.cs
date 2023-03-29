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

        public Guid GoalId { get; set; } //Maybe we can have just int ids for goals
        public string Title { get; set; }
        public string Description { get; set; }
<<<<<<< HEAD
        public TimeSpan Duration { get; set; } //The name is misleading, we should store this as DateTime named EndTime/ExpiryTime
        public GoalStatus GoalStatus { get; set; }
        public int PauseCount { get; set; }
        public int ArchiveCount { get; set; }
        public List<GoalComment> Comments { get; set; }
        public TimeSpan TimeLeft { get; set; } 
        public List<GoalTask> goalTasks { get; set; }

        public Goal()
        {
            Comments = new List<GoalComment>(); 
            goalTasks = new List<GoalTask>();  
            GoalId = Guid.NewGuid();
        }
=======
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
>>>>>>> 7d8114f0afb594182dfccb5ae89e2187b7d9c65f
    }
}

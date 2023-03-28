﻿using G4L.UserManagement.BL.Entities;
using G4L.UserManagement.BL.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G4L.UserManagement.BL.Models.Request
{
    public class UpdateGoalRequest
    {
        public Guid Id { get; set; }
        public string GoalTitle { get; set; }
        public string GoalDescription { get; set; }
        public DateTime Duration { get; set; } //This must be sent as DateTime.Now + Duration from front-end
        public GoalStatus GoalStatus { get; set; }
        public string Comments { get; set; }
        public DateTime AddedTime { get; set; }
        public TimeSpan TimeRemaining { get; set; }
        public List<GoalTask> GoalTasks {get; set; }
    }
}

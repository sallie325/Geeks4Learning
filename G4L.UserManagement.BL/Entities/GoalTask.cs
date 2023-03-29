﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G4L.UserManagement.BL.Entities
{
    public class GoalTask
    {
        public Guid TaskId { get; set; } //Do not need Guids here
        public string Description { get; set; }
        public bool IsCompleted { get; set; }
    }
}

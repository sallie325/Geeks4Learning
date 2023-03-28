﻿using G4L.UserManagement.BL.Models.Request;
using G4L.UserManagement.BL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G4L.UserManagement.BL.Interfaces
{
    public interface IGoalRepository
    {
        Task<UpdateGoalRequest> UpdateGoal(UpdateGoalRequest request);
        Task<Goal> GetGoalById(Guid id);
    }
}

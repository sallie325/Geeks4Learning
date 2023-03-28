﻿using G4L.UserManagement.BL.Entities;
using G4L.UserManagement.BL.Models.Request;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G4L.UserManagement.BL.Interfaces
{
    public interface IGoalService
    {
        public Task<List<Goal>> GetAllUserGoalsAsync(Guid UserId);
        public Task<User> CreateUserGoal(Guid UserId, CreateGoalRequest request);
        public Task<User> UpdateUserGoal(Guid UserId, UpdateGoalRequest request);
    }
}

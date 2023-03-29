
﻿using G4L.UserManagement.BL.Entities;
using G4L.UserManagement.BL.Models;
using G4L.UserManagement.BL.Models.Request;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G4L.UserManagement.BL.Interfaces
{

    public interface IGoalRepository
    {
        public Task<Goal> UpdateGoalAsync(Goal request);
        public Task<Goal> GetGoalByIdAsync(Guid id);

        public Task AddAsync(Goal goal);

        Task CreateUserGoalAsync(CreateGoalRequest goalRequest);

    }
}

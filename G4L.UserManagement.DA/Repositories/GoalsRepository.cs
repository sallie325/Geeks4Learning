
﻿using G4L.UserManagement.BL.Entities;
using G4L.UserManagement.BL.Interfaces;
using G4L.UserManagement.BL.Models.Request;
using G4L.UserManagement.Infrustructure.Repositories;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G4L.UserManagement.DA.Repositories
{
    public class GoalsRepository : Repository<Goal>, IGoalRepository
    {
        DatabaseContext _dbContext;
        public GoalsRepository(DatabaseContext dbContext) : base(dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Goal> GetGoalByIdAsync(Guid id)
        {
            return await _dbContext.FindAsync<Goal>(id);
        }

        public async Task<Goal> UpdateGoalAsync(Goal request)
        {
            var result = _dbContext.Update(request);
            await _dbContext.SaveChangesAsync();
            return result.Entity;
        }

        public Task AddAsync(CreateGoalRequest goalRequest)
        {
            throw new NotImplementedException();

        }

        public Task ListAsync(CreateGoalRequest goalRequest)
        {
            throw new NotImplementedException();

        }

        public Task CreateUserGoalAsync(CreateGoalRequest goalRequest)
        {
            throw new NotImplementedException();
        }

    }

}

using AutoMapper;
using G4L.UserManagement.Infrustructure.Repositories;
using G4L.UserManagement.BL.Entities;
using G4L.UserManagement.BL.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using G4L.UserManagement.BL.Models.Request;

namespace G4L.UserManagement.DA.Repositories
{
    public class GoalsRepository: Repository<Goal>, IGoalRepository
    {
        DatabaseContext _dbContext;
        public GoalsRepository(DatabaseContext dbContext): base(dbContext)  { 
            _dbContext = dbContext;
        }

        public async Task<Goal> GetGoalById(Guid id)
        {
            return await _dbContext.FindAsync<Goal>(id);
        }
       
        public async Task<Goal> UpdateGoal(Goal request)
        {
            var result = _dbContext.Update(request);
            await _dbContext.SaveChangesAsync();
            return result.Entity;
        }
    }
}

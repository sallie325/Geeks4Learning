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
        IMapper _mapper;
        public GoalsRepository(DatabaseContext dbContext, IMapper mapper): base(dbContext)  { 
            _dbContext = dbContext;
            _mapper = mapper;
        }

        Task<Goal> IGoalRepository.GetGoalById(Guid id)
        {
            throw new NotImplementedException();
        }

        Task<UpdateGoalRequest> IGoalRepository.UpdateGoal(UpdateGoalRequest request)
        {
            throw new NotImplementedException();
        }
    }
}

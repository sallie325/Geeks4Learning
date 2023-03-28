using G4L.UserManagement.BL.Entities;
using G4L.UserManagement.BL.Interfaces;
using G4L.UserManagement.BL.Models.Request;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using G4L.UserManagement.BL.Custom_Exceptions;
using G4L.UserManagement.BL.Models;
using G4L.UserManagement.BL.Enum;
using Newtonsoft.Json;
using System.Net.Http;

namespace G4L.UserManagement.DA.Services
{
    public class GoalsService : IGoalService
    {
        IGoalRepository goalRepository;
        public GoalsService(IGoalRepository goalRepository) {
            this.goalRepository = goalRepository;   
        }
        public Task<User> CreateUserGoal(Guid UserId, CreateGoalRequest request)
        {
            throw new NotImplementedException();
        }

        public Task<List<Goal>> GetAllUserGoals(Guid UserId)
        {
            throw new NotImplementedException();
        }

        public async Task<UpdateGoalRequest> UpdateUserGoal(Guid UserId, UpdateGoalRequest request)
        {
            //check if goal id there is a goal with specified id
            //check if there's a user with the specified id
         
            var goal = await this.goalRepository.GetGoalById(request.Id);
            if (goal == null)
            {
                throw new AppException(JsonConvert.SerializeObject(new ExceptionObject
                {
                    ErrorCode = ServerErrorCodes.GoalNotFound.ToString(),
                    Message = "The goal you are trying to update does not exist"
                })
                );
            }

            throw new NotImplementedException();
        }
    }
}

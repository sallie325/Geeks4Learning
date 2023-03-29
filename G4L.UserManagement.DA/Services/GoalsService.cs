using G4L.UserManagement.BL.Entities;
using G4L.UserManagement.BL.Interfaces;
using G4L.UserManagement.BL.Models.Request;
using G4L.UserManagement.BL.Models.Response;
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
using AutoMapper;

namespace G4L.UserManagement.DA.Services
{
    public class GoalsService : IGoalService
    {
        IGoalRepository _goalRepository;
        IMapper _mapper;
        public GoalsService(IGoalRepository goalRepository, IMapper mapper ) {
            _goalRepository = goalRepository;  
            _mapper = mapper;
        }
        public Task<User> CreateUserGoal(Guid UserId, CreateGoalRequest request)
        {
            throw new NotImplementedException();
        }

        public Task<List<Goal>> GetAllUserGoals(Guid UserId)
        {
            throw new NotImplementedException();
        }

        public async Task<UpdateGoalResponse> UpdateUserGoal(UpdateGoalRequest updateGoalRequest)
        {
           
            var oldGoal =  _mapper.Map<UpdateGoalRequest>(await _goalRepository.GetGoalById(updateGoalRequest.Id));
            //check if goal status has changed
            if(updateGoalRequest.GoalStatus != oldGoal.GoalStatus)
            {
                switch (oldGoal.GoalStatus)
                {
                    case GoalStatus.Archived:
                        //can only go to backlog
                        break;
                    case GoalStatus.Backlog:
                        //can only go to in-progress or archive
                        break;
                    case GoalStatus.Paused: 
                        break;
                    case GoalStatus.Completed: 
                        break;
                    case GoalStatus.Started: 
                        break; 
                }

            }
                
                    //if change is not legal what are linked actions

                //if change is not legal what are the linked actions

         

            var goalEntity = _mapper.Map<Goal>(updateGoalRequest);
            var updatedGoalEntity = await _goalRepository.UpdateGoal(goalEntity);
            var updatedGoalResponse = _mapper.Map<UpdateGoalResponse>(updatedGoalEntity); 
            return updatedGoalResponse;
        }
    }
}

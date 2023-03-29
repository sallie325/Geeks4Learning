using AutoMapper;
using G4L.UserManagement.BL.Entities;
using G4L.UserManagement.BL.Interfaces;
using G4L.UserManagement.BL.Models.Request;
using G4L.UserManagement.BL.Models.Response;
using G4L.UserManagement.DA.Repositories;
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

        private readonly IGoalRepository _goalRepository;
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public GoalsService(IGoalRepository goalRepository, IUserRepository userRepository, IMapper mapper)
        {
            _goalRepository = goalRepository;
            _userRepository = userRepository;
            _mapper = mapper;
        }

        public async Task CreateUserGoalAsync(CreateGoalRequest goalRequest)
        {
            var goal = _mapper.Map<Goal>(goalRequest);
            await _goalRepository.AddAsync(goal);
        }

        public async Task<List<Goal>> GetAllUserGoalsAsync(Guid UserId)
        {
            var allUserGoals = await _goalRepository.GetGoalByIdAsync(UserId);

            return _mapper.Map<List<Goal>>(allUserGoals);
        }

        public async Task<UpdateGoalResponse> UpdateUserGoal(UpdateGoalRequest updateGoalRequest)
        {
           
            var oldGoal =  _mapper.Map<UpdateGoalRequest>(await _goalRepository.GetGoalByIdAsync(updateGoalRequest.Id));
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
            var updatedGoalEntity = await _goalRepository.UpdateGoalAsync(goalEntity);
            var updatedGoalResponse = _mapper.Map<UpdateGoalResponse>(updatedGoalEntity); 
            return updatedGoalResponse;
        }
    }
}

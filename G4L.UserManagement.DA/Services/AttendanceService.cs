using AutoMapper;
using G4L.UserManagement.BL.Custom_Exceptions;
using G4L.UserManagement.BL.Entities;
using G4L.UserManagement.BL.Enum;
using G4L.UserManagement.BL.Interfaces;
using G4L.UserManagement.BL.Models;
using G4L.UserManagement.Shared;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace G4L.UserManagement.DA.Services
{
    public class AttendanceService : IAttendanceService
    {
        private readonly IAttendanceRepository _attendanceRepository;
        private readonly IUserRepository _userRepository;
        private readonly AppSettings _appSettings;
        private readonly IMapper _mapper;
        public AttendanceService(IAttendanceRepository attendanceRepository, IUserRepository userRepository, IOptions<AppSettings> appSettings, IMapper mapper)
        {
            _attendanceRepository = attendanceRepository;
            _userRepository = userRepository;
            _appSettings = appSettings.Value;
            _mapper = mapper;
        }

        public async Task UpdateAttendanceAsync(UpdateAttendanceGoals learner)
        {

            var attendance = await _attendanceRepository.GetByIdAsync(learner.Id);
            // Update the following;

            if (attendance != null)
            {

                attendance.Goal_summary = learner.Goal_summary;
                attendance.Goal_Description = learner.Goal_Description;
                attendance.Time_Limit = learner.Time_Limit;

                await _attendanceRepository.UpdateAsync(attendance);

            }
            else
            {

                throw new AppException(JsonConvert.SerializeObject(new ExceptionObject
                {
                    ErrorCode = ServerErrorCodes.UpdatingGoalsFailed.ToString(),
                    Message = "Updating learner goals failed"
                }));

              
            }
        }

            public async Task<List<AttendanceRegister>> GetAttendanceRegisterAsync(Guid userId)
            {
                var attendance = await _attendanceRepository.ListAsync(x => x.UserId == userId);
                return _mapper.Map<List<AttendanceRegister>>(attendance);
            }

            public async Task SigningAttendanceRegisterAsync(AttendanceRegister attendanceRegister)
            {
                var attendance = _mapper.Map<Attendance>(attendanceRegister);
                if (await _attendanceRepository.QueryAsync(x => x.Date == attendanceRegister.Date && x.UserId == attendanceRegister.UserId) != null)
                    throw new AppException(JsonConvert.SerializeObject(new ExceptionObject
                    {
                        ErrorCode = ServerErrorCodes.DuplicateAttendanceDate.ToString(),
                        Message = "Duplicate attendance dates found on the system"
                    }));
                await _attendanceRepository.CreateAsync(attendance);
            }

            public async Task<IEnumerable<Attendance>> GetPagedAttendancesAsync(int skip, int take)
            {
                return await _attendanceRepository.GetPagedListAsync(skip, take);
            }


        }
    }

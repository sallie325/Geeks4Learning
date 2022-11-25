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
        public async Task<List<Attendance_Register>> GetAttendanceRegisterAsync(Guid userId)
        {
            var attendance = await _attendanceRepository.ListAsync(x => x.UserId == userId);
            return _mapper.Map<List<Attendance_Register>>(attendance);
        }

        public async Task SigningAttendanceRegisterAsync(Attendance_Register attendanceRegister)
        {
            var attendance = _mapper.Map<Attendance>(attendanceRegister);
            if (await _attendanceRepository.QueryAsync(x => x.Date.Day == attendanceRegister.Date.Day && x.UserId == attendanceRegister.UserId) != null)
                throw new AppException(JsonConvert.SerializeObject(new ExceptionObject
                {
                    ErrorCode = ServerErrorCodes.DuplicateAttendanceDate.ToString(),
                    Message = "Duplicate attendance dates found on the system"
                }));
            //present
            if (attendance.Clockin_Time.Hour >= 7 && attendance.Clockin_Time.Hour <= 8)
            {
                if (attendance.Clockin_Time.Hour == 8 && attendance.Clockin_Time.Minute <= 15)
                {
                    attendance.Status = AttendanceStatus.Present;
                }
                attendance.Status = AttendanceStatus.Present;
            }
            //late
            if (attendance.Clockin_Time.Hour >= 8 && attendance.Clockin_Time.Hour <= 10 || attendance.Clockin_Time.Minute > 15)
            {
                attendance.Status = AttendanceStatus.Late;
            }
            //absent
            if (attendance.Date.Hour > 10)
            {
                attendance.Status = AttendanceStatus.Absent;
            }
            //leave
            if (attendance.Date.Hour > 10 && attendance.Leave_Status == Status.Partially_Approved)
            {
                attendance.Status = AttendanceStatus.Leave;
            }
            await _attendanceRepository.CreateAsync(attendance);
        }
        public async Task<IEnumerable<Attendance>> GetPagedAttendancesAsync(int skip, int take)
        {
            return await _attendanceRepository.GetPagedListAsync(skip, take);
        }
       
        public async Task UpdateAttendanceRegisterAsync(UpdateAttendance updateAttendance)
        {
            var attendance = await _attendanceRepository.GetByIdAsync(updateAttendance.Id);
            // Update the following;
            attendance.Clockout_Time = updateAttendance.Clockout_Time;

            await _attendanceRepository.UpdateAsync(attendance);
        }

        public async Task UpdateAttendanceGoalsAsync(UpdateAttendance updateAttendance)
        {
            var attendance = await _attendanceRepository.GetByIdAsync(updateAttendance.Id);
            // Update the following;
            attendance.Goal_Description = updateAttendance.Goal_Description;
            attendance.Goal_summary = updateAttendance.Goal_summary;
            attendance.Time_Limit = updateAttendance.Time_Limit;
            await _attendanceRepository.UpdateAsync(attendance);
        }
    }
}
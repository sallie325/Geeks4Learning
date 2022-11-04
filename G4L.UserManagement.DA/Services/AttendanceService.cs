using AutoMapper;
using G4L.UserManagement.BL.Entities;
using G4L.UserManagement.BL.Interfaces;
using G4L.UserManagement.BL.Models;
using G4L.UserManagement.DA.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace G4L.UserManagement.DA.Services
{
    public class AttendanceService : IAttendanceService
    {
        private readonly IAttendanceRepository _attendanceRepository;
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public AttendanceService(IAttendanceRepository attendanceRepository, IUserRepository userRepository,IMapper mapper)
        {
            _attendanceRepository = attendanceRepository;
            _userRepository = userRepository;
            _mapper = mapper;
        }

        public async Task RegisterAttendanceLeaveAsync(Attendance_register attendance_Register)
        {
            var attendance = _mapper.Map<Attendance>(attendance_Register);
            await _attendanceRepository.CreateAsync(attendance);
        }

        public async Task<IEnumerable<Attendance>> GetAllAttendanceAsync()
        {
            return await _attendanceRepository.ListAsync();
        }
    }
    }

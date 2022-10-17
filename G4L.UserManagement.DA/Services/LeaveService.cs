using AutoMapper;
using G4L.UserManagement.BL.Entities;
using G4L.UserManagement.BL.Enum;
using G4L.UserManagement.BL.Interfaces;
using G4L.UserManagement.BL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G4L.UserManagement.DA.Services
{
    public class LeaveService : ILeaveService
    {
        private readonly ILeaveRepository _leaveRepository;
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public LeaveService(ILeaveRepository leaveRepository, IUserRepository userRepository, IMapper mapper)
        {
            _leaveRepository = leaveRepository;
            _userRepository = userRepository;
            _mapper = mapper;
        }

        public Task<dynamic> GetLeaveBalancesAsync()
        {
            throw new NotImplementedException();
        }

        public async Task<List<LeaveRequest>> GetLeaveRequestsAsync(Guid userId)
        {
            var leaves = await _leaveRepository.ListAsync(x => x.UserId == userId);
            return _mapper.Map<List<LeaveRequest>>(leaves);
        }

        //Itumeleng Koalane added this
        public async Task HalfDayRequestAsync(HalfDayRequest halfDayRequest)
        {
            var leaveHalfDay = _mapper.Map<Leave>(halfDayRequest);
            leaveHalfDay.User = await _userRepository.GetByIdAsync(halfDayRequest.UserId);
            await _leaveRepository.CreateAsync(leaveHalfDay);
        }

        public async Task LeaveRequestAsync(LeaveRequest leaveRequest)
        {
            var leave = _mapper.Map<Leave>(leaveRequest);
            leave.User = await _userRepository.GetByIdAsync(leaveRequest.UserId);
            await _leaveRepository.CreateAsync(leave);
        }

        public async Task UpdateLeaveStatusAsync(Guid id, Status status)
        {
            var leave = await _leaveRepository.GetByIdAsync(id);
            leave.Status = status;
            await _leaveRepository.UpdateAsync(leave);
        }
    }
}

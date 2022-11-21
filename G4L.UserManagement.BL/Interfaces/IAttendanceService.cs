using G4L.UserManagement.BL.Entities;
using G4L.UserManagement.BL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G4L.UserManagement.BL.Interfaces
{
    public interface IAttendanceService
    {
        Task<List<Attendance_Register>> GetAttendanceRegisterAsync(Guid userId);
        Task<IEnumerable<Attendance>> GetPagedAttendancesAsync(int skip, int take);
        Task SigningAttendanceRegisterAsync(Attendance_Register attendanceRegister);
        Task UpdateAttendanceAsync(UpdateAttendance learner);
    }
}

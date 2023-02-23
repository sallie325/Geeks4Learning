using G4L.UserManagement.BL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G4L.UserManagement.BL.Interfaces
{
    public interface IAttendanceRepository:IRepository<Attendance>
    {
        Task AttendanceUpdateAsync(Attendance attendance);
        Task<List<Attendance>> GetAttendanceByIdAsync(Guid userId);
        Task<Attendance> GetFullAttendanceAsync(DateTime date, Guid userId);
    }
}

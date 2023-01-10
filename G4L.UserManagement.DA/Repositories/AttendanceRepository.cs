using G4L.UserManagement.BL.Entities;
using G4L.UserManagement.BL.Interfaces;
using G4L.UserManagement.Infrustructure.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G4L.UserManagement.DA.Repositories
{
    public class AttendanceRepository : Repository<Attendance>, IAttendanceRepository
    {
        private readonly DatabaseContext _databaseContext;
        public AttendanceRepository(DatabaseContext databaseContext) : base(databaseContext)
        {
            _databaseContext = databaseContext;
        }
        public async Task<List<Attendance>> GetAttendanceByIdAsync(Guid userId)
        {
            return await Task.Run(() =>
            {
                var attendances = new List<Attendance>();
                return attendances;
            });
        }

        Task IAttendanceRepository.AttendanceUpdateAsync(Attendance attendance)
        {
            throw new NotImplementedException();
        }

        Task<List<Attendance>> IAttendanceRepository.GetAttendanceByIdAsync(Guid userId)
        {
            throw new NotImplementedException();
        }
    }
}

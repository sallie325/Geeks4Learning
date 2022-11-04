using G4L.UserManagement.BL.Entities;
using G4L.UserManagement.BL.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using G4L.UserManagement.Infrustructure.Repositories;
using Microsoft.EntityFrameworkCore;


namespace G4L.UserManagement.DA.Repositories
{
    public class AttendanceRepository : Repository<Attendance>, IAttendanceRepository
    {
        public AttendanceRepository(DatabaseContext databaseContext) : base(databaseContext)
        {
        }
    }
}

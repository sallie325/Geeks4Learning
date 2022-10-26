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
    public class LeaveRepository : Repository<Leave>, ILeaveRepository
    {
        private readonly DatabaseContext _databaseContext;
        public LeaveRepository(DatabaseContext databaseContext) : base(databaseContext)
        {
            _databaseContext = databaseContext;
        }

        public async Task<List<Leave>> GetLeavesToApproveAsync(Guid userId)
        {
            return await Task.Run(() => {
                var leaves = new List<Leave>();

                var leaveIds = _databaseContext.Approvers
                .Where(x => x.UserId == userId)
                .Select(x => x.LeaveId)
                .ToList();

                leaveIds.ForEach(leaveId => {
                    var leave = _databaseContext.Leaves
                    .Where(x => x.Id == leaveId)
                    .Include(x => x.Approvers)
                    .Include(x => x.Documents)
                    .Include(x => x.LeaveSchedule)
                    .FirstOrDefault();

                    leaves.Add(leave);
                });

                return leaves;
            });
        }
    }
}

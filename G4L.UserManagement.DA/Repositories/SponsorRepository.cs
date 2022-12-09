using G4L.UserManagement.BL.Entities;
using G4L.UserManagement.BL.Interfaces;
using G4L.UserManagement.Infrustructure.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace G4L.UserManagement.DA.Repositories
{
    public class SponsorRepository : Repository<Sponsor>, ISponsorRepository
    {
        private readonly DatabaseContext _databaseContext;
        public SponsorRepository(DatabaseContext databaseContext) : base(databaseContext)
        {
            _databaseContext = databaseContext;
        }

        public async Task<List<Leave>> GetLeavesToApproveAsync(Guid userId)
        {
            return await Task.Run(() =>
            {
                var leaves = new List<Leave>();

                var leaveIds = _databaseContext.Approvers
                .Where(x => x.UserId == userId)
                .Select(x => x.LeaveId)
                .ToList();

                leaveIds.ForEach(leaveId =>
                {
                    var leave = _databaseContext.Leaves
                    .Where(x => x.Id == leaveId)
                    .Include(x => x.Approvers)
                    .Include(x => x.Documents)
                    .Include(x => x.LeaveSchedules)
                    .FirstOrDefault();

                    leaves.Add(leave);
                });

                return leaves;
            });
        }

        public async Task<List<Sponsor>> GetPagedSponsorsListAsync(int skip, int take)
        {
            return await _databaseContext.Sponsors
                .Include(x => x.Approvers)
                .Skip(skip * take)
                .Take(take)
                .AsNoTracking()
                .ToListAsync();
        }

        public async Task UpdateTrainerAsync(Sponsor sponsor)
        {
            await Task.Run(() =>
            {
                var databaseEntry = _databaseContext.Sponsors
                  .Where(p => p.Id == sponsor.Id)
                  .FirstOrDefault();

                databaseEntry.Approvers = sponsor.Approvers;

                _databaseContext.Entry(databaseEntry).State = EntityState.Modified;

                _databaseContext.SaveChanges();
            });
        }
        public async Task<Sponsor> GetFullSponsorByIdAsync(Guid sponsorId)
        {
                return await _databaseContext.Sponsors
                        .Where(p => p.Id == sponsorId)
                        .Include(x => x.Approvers)
                        .FirstAsync();
        }

        public async Task<Sponsor> GetByUserIdAsync(Guid userId)
        {
            return await Task.Run(() =>
            {
                var sponsoredUsers = _databaseContext.SponsoredUsers.Where(x => x.UserId == userId).First();
                return _databaseContext.Sponsors.Where(x => x.Id == sponsoredUsers.SponsorId).First();
            });
        }
    }
}

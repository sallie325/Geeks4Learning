using G4L.UserManagement.BL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G4L.UserManagement.BL.Interfaces
{
    public interface ISponsorRepository : IRepository<Sponsor>
    {
        Task UpdateTrainerAsync(Sponsor sponsor);
        Task<List<Sponsor>> GetPagedSponsorsListAsync(int skip, int take);
        Task<Sponsor> GetFullSponsorByIdAsync(Guid sponsorId);
        Task<Sponsor> GetByUserIdAsync(Guid userId);
    }
}

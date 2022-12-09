using G4L.UserManagement.BL.Entities;
using G4L.UserManagement.BL.Models.Request;
using G4L.UserManagement.BL.Models.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G4L.UserManagement.BL.Interfaces
{
    public interface ISponsorService
    {
        Task AddSponsorAsync(SponsorRequest leaveRequest);
        Task<SponsorResponse> GetByIdAsync(Guid sponsorId);
        Task UpdateApproversInformationAsync(SponsorResponse sponsor);
        Task<List<SponsorResponse>> GetPagedSponsorsAsync(int skip, int take);
        Task<List<UserResponse>> GetApproversByIdAsync(Guid id);
        Task UpdateTraineesInformationAsync(Guid sponsorId, List<Guid> traineesId);
        Task<SponsorResponse> GetSponsorByUserIdAsync(Guid id);
        Task<List<SponsorResponse>> GetAllAsync();
    }
}

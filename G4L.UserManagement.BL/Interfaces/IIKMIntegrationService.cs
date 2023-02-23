using G4L.UserManagement.BL.Enum;
using G4L.UserManagement.BL.Models.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G4L.UserManagement.BL.Interfaces
{
    public interface IIKMIntegrationService
    {
        Task<IKMResponse> GetResultsForDateRangeAsync(DateTime startDate, DateTime endDate, IKMStatus status);
        Task<dynamic> GetResultsAsync(int skip, int take);
    }
}

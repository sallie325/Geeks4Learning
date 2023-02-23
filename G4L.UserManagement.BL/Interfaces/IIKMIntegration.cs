using G4L.UserManagement.BL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G4L.UserManagement.BL.Interfaces
{
    public interface IIKMIntegration
    {
        Task<IKM> GetResultsForDateRangeAsync(DateTime startDate, DateTime endDate);
    }
}

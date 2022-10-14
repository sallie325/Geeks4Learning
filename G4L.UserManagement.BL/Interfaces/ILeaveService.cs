using G4L.UserManagement.BL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G4L.UserManagement.BL.Interfaces
{
    public interface ILeaveService
    {
        Task LeaveRequestAsync(LeaveRequest leaveRequest);
        //Itumeleng Koalane Added this here
        Task HalfDayRequestAsync(HalfDayRequest halfDayRequest);
    }
}

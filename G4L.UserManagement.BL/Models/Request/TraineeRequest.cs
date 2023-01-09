using G4L.UserManagement.BL.Enum;
using G4L.UserManagement.BL.Models.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G4L.UserManagement.BL.Models.Request
{
    public class TraineeRequest: UserResponse
    {
        public Career Career { get; set; }
        public DateTime LearnershipStartDate { get; set; }
    }
}

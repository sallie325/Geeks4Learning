using G4L.UserManagement.BL.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G4L.UserManagement.BL.Models.Response
{
    public class TraineeResponse: UserResponse
    {
        public SponsorResponse Sponsor { get; set; }
        public Career Career { get; set; }
        public DateTime LearnershipStartDate { get; set; }
    }
}

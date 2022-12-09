using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G4L.UserManagement.BL.Models.Response
{
    public class TrainerResponse: UserResponse
    {
        public List<SponsorResponse> Clients { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G4L.UserManagement.BL.Entities
{
    public class SponsoredUser
    {
        public Guid SponsorId { get; set; }
        public Sponsor Sponsor { get; set; }
        public Guid UserId { get; set; }
        public User User { get; set; }
    }
}

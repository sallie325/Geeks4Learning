using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G4L.UserManagement.BL.Models.Response
{
    public class SponsorResponse
    {
        public Guid Id { get; set; }
        public string RegisteredName { get; set; }
        public string TradeName { get; set; }
        public string Description { get; set; }
        public string PhysicalAdrress { get; set; }
        public string PostalAdrress { get; set; }
        public string Website { get; set; }
        public string Contact { get; set; }
        public TrainerResponse Trainer { get; set; }
        public UserResponse Admin { get; set; }
        public Guid TrainerId { get; set; }
        public Guid AdminId { get; set; }
    }
}

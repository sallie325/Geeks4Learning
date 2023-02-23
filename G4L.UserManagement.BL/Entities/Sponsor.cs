using G4L.UserManagement.Shared;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace G4L.UserManagement.BL.Entities
{
    public class Sponsor : BaseEntity
    {
        public Sponsor()
        {
            SponsoredUser = new List<SponsoredUser>();
            Approvers = new List<User>();
        }
        public string RegisteredName { get; set; }
        public string TradeName { get; set; }
        public string Description { get; set; }
        public string PhysicalAdrress { get; set; }
        public string PostalAdrress { get; set; }
        public string Website { get; set; }
        public string Contact { get; set; }
        public List<User> Approvers { get; set; }
        public List<SponsoredUser> SponsoredUser { get; set; }
        public List<Batch> Batches { get; set; }

    }
}

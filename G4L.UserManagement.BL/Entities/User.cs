using G4L.UserManagement.Shared;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace G4L.UserManagement.BL.Entities
{
    public enum Career
    {
        Business_Analyst, Software_Testing, Systems_Support, C_sharp_Stack_Developer, Java_Full_Stack_Developer
    }

    public enum Roles
    {
        Super_Admin, Admin, Trainer, Learner
    }
    public class User : BaseEntity
    {
        public string Name { get; set; }
        public string Surname { get; set; }
        public Int64 IdNumber { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Client { get; set; }
        public Career? Career { get; set; }
        public Roles? Roles { get; set; }

        public DateTime LearnershipStartDate { get; set; }
        public string Password { get; set; }
        
        public ICollection<Leave> Leaves { get; set; }

    }
}

using G4L.UserManagement.Shared;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace G4L.UserManagement.BL.Entities
{
    public enum Career
    {
        Business_Analyst, Software_Testing, Systems_Support, C_sharp_Stack_Developer, Java_Full_Stack_Developer
    }

    public enum Status
    {
        A, B, C, D, E, F, G
    }
    public class User : BaseEntity
    {
        public string Title { get; set; }
        public string Initials { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string DateOfBirth { get; set; }
        public string IdNumber { get; set; }
        public string Gender { get; set; }
        public string Ethinicity { get; set; }
        public string PhysicalAddress { get; set; }
        public string PostalAddress { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public Career? Career { get; set; }
        public string Password { get; set; }
        public Status? Status { get; set; }
        public ICollection<Role> Roles { get; set; }
        // public ICollection<Certificate> Certifications { get; set; }
        public Questionnaire Questionnaires { get; set; }
        public ICollection<Document> Documents { get; set; }
    }
}

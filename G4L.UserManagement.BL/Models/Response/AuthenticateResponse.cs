using G4L.UserManagement.BL.Entities;
using G4L.UserManagement.BL.Enum;
using Newtonsoft.Json.Converters;
using System;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace G4L.UserManagement.BL.Models
{
    public class AuthenticateResponse
    {
        public string Name { get; set; }
        public string Surname { get; set; }
        public Career Career { get; set; }
        public Role Role { get; set; }
        public string Email { get; set; }
        public Guid SponsorId { get; set; }
        public string Token { get; set; }
    }
}

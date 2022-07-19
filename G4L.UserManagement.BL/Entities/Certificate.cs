using G4L.UserManagement.Shared;

namespace G4L.UserManagement.BL.Entities
{
    public class Certificate : BaseEntity
    {
        public string Name { get; set; }
        public string Type { get; set; }
        public string Reference { get; set; }
        public string Duration { get; set; }
    }
}
using G4L.UserManagement.Shared;
using System;

namespace G4L.UserManagement.BL.Entities
{
    public class Batch: BaseEntity
    {
        public DateTime BootcampStartDate { get; set; }
        public DateTime BootcampEndDate { get; set; }
        public DateTime LearnershipStartDate { get; set; }
        public DateTime MICTSetaStartDate { get; set; }
        public DateTime MICTSetaDueDate { get; set; }
        public DateTime G4LCoursesStartDate { get; set; }
    }
}


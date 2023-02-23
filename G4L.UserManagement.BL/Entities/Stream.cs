using G4L.UserManagement.Shared;
using System.Collections.Generic;

namespace G4L.UserManagement.BL.Entities
{
    public class Stream : BaseEntity
    {
        public string Name { get; set; }
        public List<LearningPlan> LearningPlans { get; set; }
    }
}
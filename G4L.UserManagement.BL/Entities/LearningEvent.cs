using G4L.UserManagement.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G4L.UserManagement.BL.Entities
{
    public class LearningEvents: BaseEntity
    {
        public Guid LearningPlanId { get; set; }
        public Guid ModuleEventId { get; set; }

        public LearningPlan Learning { get; set; }
        public ModuleEvent ModuleEvent { get; set; }
    }
}

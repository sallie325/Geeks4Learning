using G4L.UserManagement.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G4L.UserManagement.BL.Entities
{
    public class Goal: BaseEntity
    {
        public string Summary { get; set; }
        public string Description { get; set; }
        public TimeSpan Time { get; set; }
        public DateTime CompletionTime { get; set; }
        public bool isReached { get; set; }
    }
}

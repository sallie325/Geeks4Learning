using G4L.UserManagement.BL.Enum;
using G4L.UserManagement.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G4L.UserManagement.BL.Entities
{
    public class GoalComment:BaseEntity
    {

        public int CommentId { get; set; } //Do not need Guids here
        public Guid GoalId { get; set; }
        public string Comment { get; set; }
        public GoalStatus GoalStatus { get; set; }
    }
}

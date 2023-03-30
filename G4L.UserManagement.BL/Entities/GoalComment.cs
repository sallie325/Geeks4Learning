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
        public string Comment { get; set; }
        public GoalStatus CommentType { get; set; }
    }
}

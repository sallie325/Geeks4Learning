using G4L.UserManagement.BL.Enum;
using G4L.UserManagement.Shared;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G4L.UserManagement.BL.Models.Response
{
    public class GoalCommentResponse
    {
        public Guid CommentId { get; set; }
        public string Comment { get; set; }
        public GoalStatus GoalStatus { get; set; }
    }
}

using G4L.UserManagement.Shared;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G4L.UserManagement.BL.Models.Response
{
    public class GoalTaskResponse
    {
        [Key]
        public Guid TaskId { get; set; }
        public string Description { get; set; }
        public bool IsCompleted { get; set; }
        public Guid GoalId { get; set; }
    }
}



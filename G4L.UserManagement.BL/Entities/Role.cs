using G4L.UserManagement.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G4L.UserManagement.BL.Entities
{
    public class Role: BaseEntity
    {
        public string Name { get; set; }
        public ICollection<AccessLevel> AccessLevels { get; set; }
    }
}

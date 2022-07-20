using System;
using G4L.UserManagement.Shared;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G4L.UserManagement.BL.Entities
{
    public class Document : BaseEntity
    {
        
        public string FileName { get; set; }
        public string FilePath { get; set; }
       
        
    }
}

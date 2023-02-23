using G4L.UserManagement.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G4L.UserManagement.BL.Entities
{
    public class StreamCourse: BaseEntity
    {
        public Guid StreamId { get; set; }
        public Guid CourseId { get; set; }

        public Stream Stream { get; set; }
        public Course Course { get; set; }
    }
}

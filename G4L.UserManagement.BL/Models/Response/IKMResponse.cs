using G4L.UserManagement.BL.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G4L.UserManagement.BL.Models.Response
{
    public class IKMResponse
    {
        public string Status { get; set; }
        public string StatusText { get; set; }
        public List<IKMTestSummaryResponse> Output { get; set; }
    }

    public class IKMTestSummaryResponse
    {
        public string RoutingCode { get; set; }
        public string RecruiterEmail { get; set; }
        public string RecruiterName { get; set; }
        public string Department { get; set; }
        public string ScheduledDate { get; set; }
        public string ScoringDate { get; set; }
        public string Scoring { get; set; }
        public string TestTitle { get; set; }
        public string TestType { get; set; }
        public IKMStatus TestStatus { get; set; }
        public string TestTakerName { get; set; }
        public string TestTakerId { get; set; }
        public string TestTakerEmail { get; set; }
        public string LastActivityDate { get; set; }
        public string Ip { get; set; }
        public string Country { get; set; }
        public string ElapsedTime { get; set; }
    }
}

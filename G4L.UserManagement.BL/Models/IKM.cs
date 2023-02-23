using G4L.UserManagement.BL.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G4L.UserManagement.BL.Models
{
    public class IKM
    {
        public string status { get; set; }
        public string status_text { get; set; }
        public List<IKMTestSummary> output { get; set; }
    }

    public class IKMTestSummary
    {
        public string routing_code { get; set; }
        public string recruiter_email { get; set; }
        public string recruiter_name { get; set; }
        public string department { get; set; }
        public string scheduled_date { get; set; }
        public string scoring_date { get; set; }
        public string scoring { get; set; }
        public string test_title { get; set; }
        public string test_type { get; set; }
        public IKMStatus test_status { get; set; }
        public string test_taker_name { get; set; }
        public string test_taker_id { get; set; }
        public string test_taker_email { get; set; }
        public string last_activity_date { get; set; }
        public string ip { get; set; }
        public string country { get; set; }
        public string elapsed_time { get; set; }
    }
}

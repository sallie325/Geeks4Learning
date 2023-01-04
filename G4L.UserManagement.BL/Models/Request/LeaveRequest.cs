using G4L.UserManagement.BL.Entities;
using G4L.UserManagement.BL.Enum;
using G4L.UserManagement.BL.Models.Response;
using System;
using System.Collections.Generic;

namespace G4L.UserManagement.BL.Models.Request
{
    public class LeaveRequest
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public User User { get; set; }
        public SponsorRequest Sponsor { get; set; }
        public List<LeaveBalanceResponse> LeaveBalances { get; set; }
        public LeaveType LeaveType { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public decimal UsedDays { get; set; }
        public List<LeaveScheduleRequest> LeaveSchedule { get; set; }
        public string Comments { get; set; }
        public Status Status { get; set; } = Status.Pending;
        public ICollection<ApproverRequest> Approvers { get; set; }
        public ICollection<DocumentRequest> Documents { get; set; }  // TODO: think of a better way to save attachments
   
    }
}

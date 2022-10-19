import { Component, OnInit } from '@angular/core';
import { LeaveService } from '../services/leave.service';

@Component({
  selector: 'app-total-pending-approval-rejection',
  templateUrl: './total-pending-approval-rejection.component.html',
  styleUrls: ['./total-pending-approval-rejection.component.css']
})
export class TotalPendingApprovalRejectionComponent implements OnInit {
  allRequests: any;
  pending: any = 0;
  approved: any = 0;
  rejected: any = 0;
  constructor(private _leaveService: LeaveService) { }

  ngOnInit() {
    this.getAllLeaveApplications();
  }
  calcStatuses(status: any) {
    // if (status == "Pending") {
    //   this.pending += 1;
    // } else if (status.equals("Approved")) {
    //   this.approved += 1;
    // } else if (status.equals("Rejected")) {
    //   this.rejected += 1;
    // }
  }
  getAllLeaveApplications() {
    this._leaveService.getAllLeaveApplications().subscribe((requests) => {
      this.allRequests = requests;
      this.allRequests.forEach((x: any) => {
        if (x.status == "Cancelled") {
          this.approved += 1;
        } else {
          this.pending +=1;
        }
        console.log(this.allRequests);
        this.calcStatuses(x.status);
      })
    })
  }

}

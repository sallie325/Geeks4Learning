import { Component, OnInit } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from '../usermanagement/login/services/token.service';
import { LeaveRequestComponent } from './leave-request/leave-request.component';
import { LeaveService } from './services/leave.service';

@Component({
  selector: 'app-leave-management',
  templateUrl: './leave-management.component.html',
  styleUrls: ['./leave-management.component.css']
})
export class LeaveManagementComponent implements OnInit {

  modalDialog: MdbModalRef<LeaveRequestComponent> | null = null;
  leaveApplications: any[] = [];

  constructor(
    private modalService: MdbModalService,
    private toastr: ToastrService,
    private leaveService: LeaveService,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    let user: any = this.tokenService.getDecodeToken();
    this.getLeaveApplication(user.id);
  }

  getLeaveApplication(userId: any) {
    this.leaveService.getLeaveApplications(userId)
      .subscribe(arg => {
        console.log(arg);
        this.leaveApplications = arg;
      });
    ;
  }

  openDialog() {
    this.modalDialog = this.modalService.open(LeaveRequestComponent, {
      animation: true,
      backdrop: true,
      containerClass: 'modal top fade modal-backdrop',
      data: { },
      ignoreBackdropClick: false,
      keyboard: true,
      modalClass: 'modal-xl modal-dialog-centered',
    });

    this.modalDialog.onClose.subscribe((isUpdated: boolean) => {
      if (isUpdated) return; // this.getLeaveRequest();
    });
  }

  cancelApplication(id: any) {
    // Cancl leave here
  }

}

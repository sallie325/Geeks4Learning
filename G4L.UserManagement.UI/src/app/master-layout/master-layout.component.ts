import { Component, OnInit } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ToastrService } from 'ngx-toastr';
import { CaptureGoalsComponent } from '../attendence-register/capture-goals/capture-goals.component';
import { LunchTimeNotificationComponent } from '../attendence-register/lunch-time-notification/lunch-time-notification.component';
import { ReviewGoalsComponent } from '../attendence-register/review-goals/review-goals.component';
import { contants } from '../shared/global/global.contants';

@Component({
  selector: 'app-master-layout',
  templateUrl: './master-layout.component.html',
  styleUrls: ['./master-layout.component.css']
})
export class MasterLayoutComponent implements OnInit {

  modalDialog: MdbModalRef<CaptureGoalsComponent> | null = null;
  modalRef: any;
  time: any;

  testTime: any
  constructor(
    private modalService: MdbModalService,
    private toastr: ToastrService,

  ) { }

  ngOnInit(): void {
    var time: any = sessionStorage.getItem("time")
    this.captureGoals();
    this.startTimer();
    console.log(time);
  }
  captureGoals() {
  }
  startTimer() {
    setInterval(() => {
      this.testTime = (new Date(Date.now()).getMinutes());
      var time: any = sessionStorage.getItem("time")
      if (this.testTime == time) {
        this.modalDialog = this.modalService.open(CaptureGoalsComponent, {
          animation: true,
          backdrop: true,
          containerClass: 'modal top fade modal-backdrop',
          ignoreBackdropClick: false,
          keyboard: true,
          modalClass: 'modal-xl modal-dialog-centered',
        });
      }
      console.log(this.testTime);
    }, 60000);

  }
}

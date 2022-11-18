import { Component, OnInit } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ToastrService } from 'ngx-toastr';
import { CaptureGoalsComponent } from '../attendence-register/capture-goals/capture-goals.component';
import { LunchTimeNotificationComponent } from '../attendence-register/lunch-time-notification/lunch-time-notification.component';
import { ReviewGoalsComponent } from '../attendence-register/review-goals/review-goals.component';

@Component({
  selector: 'app-master-layout',
  templateUrl: './master-layout.component.html',
  styleUrls: ['./master-layout.component.css']
})
export class MasterLayoutComponent implements OnInit {

  modalDialog: MdbModalRef<CaptureGoalsComponent> | null = null;
  modalRef: any;
  time: any;


  constructor(
    private modalService: MdbModalService,
    private toastr: ToastrService,

  ) { }

  ngOnInit(): void {

    


      this.time = new Date().toTimeString();
      if (this.time.substring(0, 8) == '08:17:00') {

        this.modalDialog = this.modalService.open(CaptureGoalsComponent, {
          animation: true,
          backdrop: true,
          containerClass: 'modal top fade modal-backdrop',
          ignoreBackdropClick: false,
          keyboard: true,
          modalClass: 'modal-xl modal-dialog-centered',
        });
        console.log(this.time);


      }

      if (this.time.substring(0, 8) == '08:20:00') {

        this.modalDialog = this.modalService.open(LunchTimeNotificationComponent, {
          animation: true,
          backdrop: true,
          containerClass: 'modal top fade modal-backdrop',
          ignoreBackdropClick: false,
          keyboard: true,
          modalClass: 'modal-lg modal-dialog-centered',
        });
        console.log(this.time);


      }

      if (this.time.substring(0, 8) == '15:55:00') {

        this.modalDialog = this.modalService.open(ReviewGoalsComponent, {
          animation: true,
          backdrop: true,
          containerClass: 'modal top fade modal-backdrop',
          ignoreBackdropClick: false,
          keyboard: true,
          modalClass: 'modal-lg l modal-dialog-centered',
        });
        console.log(this.time);


      }







  }
}

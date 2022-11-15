import { Component, OnInit } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ToastrService } from 'ngx-toastr';
import { CaptureGoalsComponent } from '../../capture-goals/capture-goals.component';
import { LunchTimeNotificationComponent } from '../../lunch-time-notification/lunch-time-notification.component';
import { ReviewGoalsComponent } from '../../review-goals/review-goals.component';

@Component({
  selector: 'app-trainee-attendance',
  templateUrl: './trainee-attendance.component.html',
  styleUrls: ['./trainee-attendance.component.css']
})
export class TraineeAttendanceComponent implements OnInit {

 
  modalDialog: MdbModalRef<CaptureGoalsComponent> | null = null;
  modalRef: any;
  time :any ;


  constructor(
    private modalService: MdbModalService,
    private toastr: ToastrService,
  
  ) { }

  ngOnInit(): void {

    setInterval(()=> {

      this.time =new Date().toTimeString();
    if(this.time.substring(0,8) == '08:30:00'){

      this.modalDialog = this.modalService.open(LunchTimeNotificationComponent)
      console.log(this.time);
      this.toastr.info('Dont you want to take lunch');

    }

    if(this.time.substring(0,8) == '15:59:00'){

      this.modalDialog = this.modalService.open(ReviewGoalsComponent)
      console.log(this.time);
      this.toastr.info('Before you logout, lets review some goals');

    }


     
    },1000)

    
   
  }

  CreateGoalsDialog() {
    this.modalDialog = this.modalService.open(CaptureGoalsComponent, {
      animation: true,
      backdrop: true,
      containerClass: 'modal top fade modal-backdrop',
      ignoreBackdropClick: false,
      keyboard: true,
      modalClass: 'modal-xl modal-dialog-centered',
    });
  }

  
  LunchDialog() {
    this.modalDialog = this.modalService.open(LunchTimeNotificationComponent, {
      animation: true,
      backdrop: true,
      containerClass: 'modal Bottom fade modal-backdrop',
      ignoreBackdropClick: false,
      keyboard: true,
      modalClass: 'modal-sm  modal-side modal-bottom-right',
    });
  }

   
  GoalsDialog() {
    this.modalDialog = this.modalService.open(ReviewGoalsComponent, {
      animation: true,
      backdrop: true,
      containerClass: 'modal top fade modal-backdrop',
      ignoreBackdropClick: false,
      keyboard: true,
      modalClass: 'modal-xl modal-dialog-centered',
    });
  }



}

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
  time :any ;


  constructor(
    private modalService: MdbModalService,
    private toastr: ToastrService,
  
  ) { }

  ngOnInit(): void {

    setInterval(()=> {

      this.time =new Date().toTimeString();
    if(this.time.substring(0,8) == '08:33:00'){

      this.modalDialog = this.modalService.open(LunchTimeNotificationComponent)
      console.log(this.time);
      this.toastr.info('Dont you want to take lunch');

    }

    if(this.time.substring(0,8) == '08:47:00'){

      this.modalDialog = this.modalService.open(ReviewGoalsComponent)
      console.log(this.time);
      this.toastr.info('Before you logout, lets review some goals');

    }


     
    },1000)

    
   
  }
}

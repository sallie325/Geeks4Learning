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


  constructor(
    private modalService: MdbModalService,
    private toastr: ToastrService,

  ) { }

  ngOnInit(): void {
    let time: any = sessionStorage.getItem(contants.time)
    
    let number: any = time.substring(15, 16);
    var sum:any  = number - (-1);
    console.log(time.substring(14, 16), "sum: ", sum);
    setInterval(() => {
      let times: any = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, -1)
      if (sum == false) {

        this.modalDialog = this.modalService.open(CaptureGoalsComponent)
        console.log(this.time);
        this.toastr.info('Dont you want to take lunch');

      }
    }, 10000)



  }
}

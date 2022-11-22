import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { isNull, values } from 'lodash';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ToastrService } from 'ngx-toastr';
import { AttendanceStatus } from 'src/app/shared/global/attendance-type';

import { contants } from 'src/app/shared/global/global.contants';
import { TokenService } from 'src/app/usermanagement/login/services/token.service';
import { CaptureGoalsComponent } from '../../capture-goals/capture-goals.component';
import { LunchTimeNotificationComponent } from '../../lunch-time-notification/lunch-time-notification.component';
import { AttendenceService } from '../../services/attendence.service';

@Component({
  selector: 'app-trainee',
  templateUrl: './trainee.component.html',
  styleUrls: ['./trainee.component.css']
})
export class TraineeComponent implements OnInit {
  modalDialog: MdbModalRef<CaptureGoalsComponent> | null = null;
modalRef: any;
  date: any;
  userId: any | null
  holdingArray: FormGroup = new FormGroup({});
  result: any;
  id: any;
  loginTime: any;
  statu$: any = AttendanceStatus.Present;
  testTime:any
  leaveApplications: any;
  constructor(private toastr:ToastrService, private tokenService: TokenService, private attendanceService: AttendenceService, private formBuilder: FormBuilder,private modalService: MdbModalService,
    ) { }
  ngOnInit(): void {
    this.startTimer()
    let date: any = sessionStorage.getItem("date");
    let loginTime: any = sessionStorage.getItem(contants.time);
    this.loginTime = loginTime;
    
    this.date = date;
    this.buildData();
    this.sendDetails()
  }
  sendDetails() {
    console.log(this.holdingArray.value + " ")
    this.attendanceService.captureDetails(this.holdingArray.value).subscribe(_ => {
      window.location.reload();
    });

  }
  buildData() {
    let user: any = this.tokenService.getDecodeToken();
    this.userId = user.id;
    console.log(this.userId);
    this.holdingArray = this.formBuilder.group({
      userId: [this.userId],
      date: [this.date],
      clockin_Time: [this.loginTime],
      status: [this.statu$]
    });
    console.log(this.holdingArray.value)
    this.getAttendance(this.userId)
  }
  getAttendance(userId: any) {
    this.attendanceService.getAttendences(userId).subscribe((res: any) => {
      this.result = res;
      console.log(this.result, " getItems")
    })
  }
  getStatus(status: any): any {
    switch (status) {
      case AttendanceStatus.Present:
        return 'present'
      case AttendanceStatus.Absent:
        return 'absent'
      case AttendanceStatus.Late:
        return 'late'
      case AttendanceStatus.Leave:
        return 'leave'
      default:
        return undefined;
    }
  }
  startTimer() {
    setInterval(() => {
      let time = new Date(Date.now()).getSeconds();
      this.testTime = new Date().toTimeString();
      if(this.testTime.substring(0,8) == "12:00:00"){
        this.modalDialog = this.modalService.open(LunchTimeNotificationComponent, {
          animation: true,
          backdrop: true,
          containerClass: 'modal top fade modal-backdrop',
          ignoreBackdropClick: false,
          keyboard: true,
          modalClass: 'modal-xl modal-dialog-centered',
        });
      }
      console.log(time);
    }, 1000);
    
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

}

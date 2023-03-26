import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { isNull, values } from 'lodash';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ToastrService } from 'ngx-toastr';
import { AttendanceStatus } from 'src/app/shared/global/attendance-type';

import { constants } from 'src/app/shared/global/global.constants';
import { TokenService } from 'src/app/user-management/login/services/token.service';
import { CaptureGoalsComponent } from '../../../goal-management/modals/capture-goals/capture-goals.component';
import { LunchTimeNotificationComponent } from '../../lunch-time-notification/lunch-time-notification.component';
import { AttendanceService } from '../../services/attendance.service';

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
  testTime: any
  leaveApplications: any;
  constructor(private toastr: ToastrService, private tokenService: TokenService, private attendanceService: AttendanceService, private formBuilder: FormBuilder, private modalService: MdbModalService,
  ) { }
  ngOnInit(): void {
    // this.startTimer();
    let date: any = sessionStorage.getItem("date");
    let loginTime: any = sessionStorage.getItem(constants.time);
    this.loginTime = loginTime;

    this.date = date;
    this.buildData();
    // this.sendDetails()
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
    this.attendanceService.getAttendances(userId).subscribe((res: any) => {
      this.result = res;
      this.result.forEach((element: any) => {
        this.id = element.id;
      });
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
      if (this.testTime.substring(0, 8) == "12:00:00") {
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

  // CreateGoalsDialog(id:any) {
  //   this.modalDialog = this.modalService.open(CaptureGoalsComponent, {
  //     animation: true,
  //     backdrop: true,
  //     data:{attendanceId: id},
  //     containerClass: 'modal top fade modal-backdrop',
  //     ignoreBackdropClick: false,
  //     keyboard: true,
  //     modalClass: 'modal-xl modal-dialog-centered',
  //   });
  // }

}

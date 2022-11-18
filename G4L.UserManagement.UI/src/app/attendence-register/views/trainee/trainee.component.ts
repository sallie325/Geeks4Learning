import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { isNull, values } from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { contains } from 'ramda';
import { LeaveService } from 'src/app/leave-management/services/leave.service';
import { AttendanceType } from 'src/app/shared/global/attendance-type';
import { contants } from 'src/app/shared/global/global.contants';
import { TokenService } from 'src/app/usermanagement/login/services/token.service';
import { AttendenceService } from '../../services/attendence.service';

@Component({
  selector: 'app-trainee',
  templateUrl: './trainee.component.html',
  styleUrls: ['./trainee.component.css']
})
export class TraineeComponent implements OnInit {
  date: any;
  userId: any | null
  holdingArray: FormGroup = new FormGroup({});
  result: any;
  logoutTime: any = '';
  id: any;
  loginTime: any;
  statu$: any;
  testTime:any
  leaveApplications: any;
  constructor(private toastr:ToastrService, private leaveService: LeaveService, private tokenService: TokenService, private attendanceService: AttendenceService, private formBuilder: FormBuilder) { }
  ngOnInit(): void {
    this.startTimer()
    let date: any = sessionStorage.getItem("date");
    let loginTime: any = sessionStorage.getItem(contants.time);
    // let loginTime: any = "07:15"
    this.loginTime = loginTime.substring(0,5);
    // validating 7:00 to 8:15 for present status
    if (loginTime.substring(1, 2) >= 7 && loginTime.substring(1, 2) <= 8 && loginTime.substring(0, 1) == 0) {
      if ((loginTime.substring(3, 4) == 0 || loginTime.substring(3, 4) == 1) && loginTime.substring(4, 5) <= 5 && loginTime.substring(1, 2) == 8) {
        this.statu$ = AttendanceType.Present
      } else {
        this.statu$ = AttendanceType.Present
      }
    }
    // validating 7:00 to 8:15 for present status
    // validating for late status
    if ((loginTime.substring(3, 4) == 1 && loginTime.substring(4, 5) > 5) && loginTime.substring(1, 2) >= 8 || (loginTime.substring(0, 1) == 1 && loginTime.substring(1, 2) >= 0 || loginTime.substring(1, 2) <= 1)) {
      this.statu$ = AttendanceType.Late;
      console.log(this.statu$);
    }
    // validating for late status
    // validating for 'absent' status

    else {
      console.log(AttendanceType.Absent);
    }
    console.log(this.leaveApplications, 'leave')
    // validating for 'absent' status
    this.date = date;
    this.buildData();
    this.getLeaveDetails(this.userId);
    this.sendDetails()
  }
  getLeaveDetails(userId: any) {
    this.leaveService.getLeaveApplications(userId)
      .subscribe(arg => {
        this.leaveApplications = arg;
        console.log(this.leaveApplications, 'leave')
      });
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
      attendanceDate: [this.date],
      loginTime: [this.loginTime],
      logoutTime: [this.logoutTime],
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
      case AttendanceType.Present:
        return 'present'
      case AttendanceType.Absent:
        return 'absent'
      case AttendanceType.Late:
        return 'late'
      case AttendanceType.Leave:
        return 'leave'
      default:
        return undefined;
    }
  }
  startTimer() {
    setInterval(() => {
      this.testTime = new Date().toTimeString();
      if(this.testTime.substring(0,8) == "12:00:00"){
        alert("Do you want to take lunch?")
        this.toastr.info("Do you want to take lunch?")
      }
      console.log(this.testTime);
    }, 1000);
    
  }
}

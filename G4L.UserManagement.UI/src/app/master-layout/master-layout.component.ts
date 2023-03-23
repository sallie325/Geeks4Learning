import { Component, OnInit } from '@angular/core';
import { EventService } from '../leave-management/services/event.service';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ToastrService } from 'ngx-toastr';
import { CaptureGoalsComponent } from '../goal-management/capture-goals/capture-goals.component';
import { AttendanceService } from '../attendance-register/services/attendance.service';
import { TokenService } from '../user-management/login/services/token.service';
import { CaptureGoalService } from '../goal-management/services/capture-goal.service';

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
  attendance: any;

  constructor(
    private tokenService: TokenService,
    private attendanceService: AttendanceService,
    private toastr: ToastrService,
    private eventService: EventService,
    private captureGoalService: CaptureGoalService
  ) { }

  ngOnInit(): void {
    let user: any = this.tokenService.getDecodeToken();

    this.attendanceService.getAttendances(user.id).subscribe((res: any = []) => {
      res.forEach((res: any) => {
        this.attendance = res
      })
    })

    this.getPublicHoildays("en%2Esa%23holiday%40group%2Ev%2Ecalendar%2Egoogle%2Ecom");
    this.captureGoal();
  }

  captureGoal() {
    this.testTime = (new Date(Date.now()).getMinutes());
    const time: string | null = sessionStorage.getItem("times")

    console.log(this.testTime, time)

    if (this.testTime == time) {
      this.captureGoalService.openCaptureGoal(this.attendance)
    }
    console.log(this.testTime);
  }

  getPublicHoildays(calendarId: string) {
    this.eventService.getCalendarEvents(calendarId);
  }
}

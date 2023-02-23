import { Component, OnInit } from '@angular/core';
import { EventService } from '../leave-management/services/event.service';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ToastrService } from 'ngx-toastr';
import { CaptureGoalsComponent } from '../attendence-register/capture-goals/capture-goals.component';
import { AttendenceService } from '../attendence-register/services/attendence.service';
import { TokenService } from '../usermanagement/login/services/token.service';
import { T } from 'ramda';

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
  attendance: any = {};

  constructor(
    private tokenService: TokenService,
    private attendanceService: AttendenceService,
    private modalService: MdbModalService,
    private toastr: ToastrService,
    private eventService: EventService,
  ) { }

  ngOnInit(): void {
    let user: any = this.tokenService.getDecodeToken();
    this.getAttendenceToday(user.id);
    this.getPublicHoildays("en%2Esa%23holiday%40group%2Ev%2Ecalendar%2Egoogle%2Ecom");
  }

  captureGoal() {
    this.modalDialog = this.modalService.open(CaptureGoalsComponent, {
      animation: true,
      backdrop: true,
      data: { attendence: this.attendance },
      containerClass: 'modal top fade modal-backdrop',
      ignoreBackdropClick: false,
      keyboard: true,
      modalClass: 'modal-xl modal-dialog-centered',
    });

    this.modalDialog.onClose.subscribe((response: any) => {
      if (response) {
        this.attendance.goals = response?.goals;
        this.saveAttendence(this.attendance);
      }
    });
  }

  saveAttendence(attendance: any) {
    this.attendanceService.saveAttendence(attendance)
      .subscribe((_: any) => {
        this.attendanceService.saveToLocalStorage(attendance);
      });
  }

  getAttendenceToday(id: any) {
    this.attendanceService.getAttendences(id)
      .subscribe((attendance: any) => {
        if (!attendance) {
          this.attendance.userId = id;
          this.captureGoal();
        } else {
          this.attendanceService.saveToLocalStorage(attendance);
        }
      });
  }

  getPublicHoildays(calendarId: string) {
    this.eventService.getCalendarEvents(calendarId);
  }
}

import { Component, OnInit } from '@angular/core';
import { EventService } from '../leave-management/services/event.service';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { ToastrService } from 'ngx-toastr';
import { CaptureGoalsComponent } from '../goal-management/modals/capture-goals/capture-goals.component';
import { AttendanceService } from '../attendance-register/services/attendance.service';
import { TokenService } from '../user-management/login/services/token.service';
import { GoalModel } from '../goal-management/models/goal-model';
import { backlogState, archivedState, completedState, pausedState, startedState } from '../shared/constants/goal-states';
import { ActiveGoalService } from '../goal-management/services/component-logic/active-goal.service';
import { CaptureGoalService } from '../goal-management/services/component-logic/capture-goal.service';
import { GoalManagementService } from '../goal-management/services/data/goal-management.service';

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
    private captureGoalService: CaptureGoalService,
    private goalManagementService: GoalManagementService,
    private activeGoalPopupService: ActiveGoalService
  ) { }

  ngOnInit(): void {
    let user: any = this.tokenService.getDecodeToken();

    this.attendanceService.getAttendances(user.id).subscribe((res: any = []) => {
      res.forEach((res: any) => {
        this.attendance = res
      })
    })

    this.getUserGoals(user.id);

    this.getPublicHoildays("en%2Esa%23holiday%40group%2Ev%2Ecalendar%2Egoogle%2Ecom");
    this.captureGoal();
  }

  captureGoal() {
    this.testTime = (new Date(Date.now()).getMinutes());
    const time: string | null = sessionStorage.getItem("times")

    console.log(this.testTime, time)

    if (this.testTime == time) {
      this.captureGoalService.openCaptureGoalDialog(this.attendance)
    }
    console.log(this.testTime);
  }

  getPublicHoildays(calendarId: string) {
    this.eventService.getCalendarEvents(calendarId);
  }

  getUserGoals(user_id: string) {
    this.goalManagementService.onSelectUserGoals(user_id).subscribe((goal: GoalModel) => {
      // console.log(goal)
      switch (goal.goalStatus) {
        case backlogState:
          this.goalManagementService.getGoalTypeObjectList().backlog.push(goal);
          break;
        case archivedState:
          this.goalManagementService.getGoalTypeObjectList().archived.push(goal);
          break;
        case completedState:
          this.goalManagementService.getGoalTypeObjectList().completed.push(goal);
          break;
        case pausedState:
          this.goalManagementService.getGoalTypeObjectList().paused.push(goal);
          break;
        case startedState:
          // Restore goal session
          if (this.goalManagementService.getGoalTypeObjectList().started.length == 0) {
            // Checking if user has a past session
            if (sessionStorage.getItem('activeGoalSession')) {
              const lastActiveGoalSession = JSON.parse(sessionStorage.getItem('activeGoalSession')!)
              if (goal.id === lastActiveGoalSession.id) goal.timeRemaining = lastActiveGoalSession.timeLeft;
            }
            this.goalManagementService.getGoalTypeObjectList().started.push(goal);
            this.activeGoalPopupService.activateGoalCountDown(this.goalManagementService.getGoalTypeObjectList().started[0])
          }
          break;
      }
    });
  }
}

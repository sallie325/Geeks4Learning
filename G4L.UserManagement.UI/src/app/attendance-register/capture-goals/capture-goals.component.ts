import { GoalModel } from './../../goal-management/models/goal-model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from 'src/app/user-management/login/services/token.service';
import { AttendanceService } from '../services/attendance.service';

@Component({
  selector: 'app-capture-goals',
  templateUrl: './capture-goals.component.html',
})
export class CaptureGoalsComponent implements OnInit {
  formModel: FormGroup = new FormGroup({});
  time_Limit: any;
  attendanceId: any;
  currentGoal: GoalModel = {
    id: 0,
    title: 'Sample Goal Name',
    description: 'Sample Goal Description',
    duration: '5 days remaining',
    tasks: [],
    comment: "",
    pausedCount: 0,
    goalType: 'backlog'
  }

  ngOnInit(): void {
    this.buildForm();
  }
  buildForm() {
    this.formModel = this.formBuilder.group({
      id: [this.attendanceId],
      goal_title: [],
      goal_description: [],
      time_limit: [],
    });
  }
  AddGoal() {
    console.log(this.currentGoal)
    this.attendanceService
      .updateAttendanceGoals(this.formModel.value)
      .subscribe((_) => {});
  }

  constructor(
    private attendanceService: AttendanceService,
    public modalRef: MdbModalRef<CaptureGoalsComponent>,
    private formBuilder: FormBuilder
  ) {}

  close() {
    this.modalRef.close();
  }
}

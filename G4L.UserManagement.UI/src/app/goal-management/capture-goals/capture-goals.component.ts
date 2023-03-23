import { GoalManagementService } from './../services/goal-management.service';
import { GoalModel } from '../models/goal-model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from 'src/app/user-management/login/services/token.service';
import { AttendanceService } from '../../attendance-register/services/attendance.service';

@Component({
  selector: 'app-capture-goals',
  templateUrl: './capture-goals.component.html',
})
export class CaptureGoalsComponent implements OnInit {

  formModel: FormGroup = new FormGroup({
    limit: new FormControl()
  });
  time_Limit: any;
  attendanceId: any;
  currentGoal: GoalModel = {
    id: 0,
    title: 'Sample Goal Name',
    description: 'Sample Goal Description',
    duration: '00:00',
    tasks: [],
    comment: "",
    pausedCount: 0,
    goalStatus: 'backlog'
  }

  constructor(
    private goalManagementService: GoalManagementService,
    public modalRef: MdbModalRef<CaptureGoalsComponent>,
    private formBuilder: FormBuilder
  ) { }

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
    console.log(this.formModel)
    console.log("calling saveGoal(this.currentGoal)");
    this.goalManagementService.saveGoal(this.currentGoal);
    alert("User goal has been added");
    this.close();
    // this.attendanceService
    //   .updateAttendanceGoals(this.formModel.value)
    //   .subscribe((_) => {});
  }

  close() {
    this.modalRef.close();
  }

  UpdateGoals() { }
}

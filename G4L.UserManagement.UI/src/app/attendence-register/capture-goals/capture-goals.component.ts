import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from 'src/app/usermanagement/login/services/token.service';
import { AttendenceService } from '../services/attendence.service';

@Component({
  selector: 'app-capture-goals',
  templateUrl: './capture-goals.component.html',
  styleUrls: ['./capture-goals.component.css']
})
export class CaptureGoalsComponent implements OnInit {

  formModel: any;
  attendance: any = {};

  constructor(
    public modalRef: MdbModalRef<CaptureGoalsComponent>,
    private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    console.log(this.attendance);
    this.buildForm();
    this.setGoals(this.attendance.goals);
  }

  buildForm() {
    this.formModel = this.formBuilder.group({
      id: [this.attendance?.id],
      userId: [this.attendance?.userId],
      goals: this.formBuilder.array([])
    });
  }

  setGoals(goals: any[]) {
    if (!goals) {
      this.addGoal();
      return;
    }
    goals.forEach((goal: any) => {
      this.formModel.get('goals').push(this.goalForm(goal));
    });
  }

  addGoal(goal?: any) {
    this.formModel.get('goals').push(this.goalForm(goal));
  }

  goalForm(goal?: any): any {
    return this.formBuilder.group({
      summary: [goal?.summary, Validators.required],
      time: [goal?.time, Validators.required],
      description: [goal?.description],
      isReached: [false, Validators.required]
    });
  }

  saveGoals() {
    this.modalRef.close(this.formModel.value);
  }

  getFormControl(form: any, formControlName: string): any {
    return form.controls[formControlName];
  }

  close() {
    this.modalRef.close();
  }
}

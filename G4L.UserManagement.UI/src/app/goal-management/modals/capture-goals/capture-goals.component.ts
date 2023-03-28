import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { AttendanceService } from 'src/app/attendance-register/services/attendance.service';
import { GoalModel } from '../../models/goal-model';
import { GoalManagementService } from '../../services/goal-management.service';
import { CreateGoalTaskComponent } from '../create-goal-task/create-goal-task.component';

@Component({
  selector: 'app-capture-goals',
  templateUrl: './capture-goals.component.html',
  styleUrls: ['./capture-goals.component.css'],
})
export class CaptureGoalsComponent implements OnInit {
  attendanceId: any;

  formModel: FormGroup = new FormGroup({
    title: new FormControl(null, [Validators.required]),
    duration: new FormControl(null, [Validators.required]),
    description: new FormControl('')
  });

  currentGoal: GoalModel = {
    title: String(''),
    description: String(''),
    duration: String('00:00:00'),
    pausedCount: 0,
    goalStatus: 'backlog',
    timeRemaining: String('00:00:00'),
    comment: [],
    tasks: [],
    archiveCount: 0,
    attendanceId: '',
    userId: ''
  };

  constructor(
    private goalManagementService: GoalManagementService,
    private modalRef: MdbModalRef<CaptureGoalsComponent>,
    private taskModalService: MdbModalService,
    private taskModalRef: MdbModalRef<CreateGoalTaskComponent>,
    private attendanceService: AttendanceService
  ) { }

  ngOnInit(): void { }

  getFormControl(name: string): AbstractControl {
    return this.formModel.controls[name];
  }

  isFormControlTouched(name: string): boolean {
    return this.getFormControl(name).touched;
  }

  isFormControlInvalid(name: string): boolean {
    return this.getFormControl(name).invalid;
  }

  setGoalValues(title: string, duration: string, description: string): void {
    this.currentGoal.title = title;
    this.currentGoal.duration = duration.concat(":00");
    this.currentGoal.description = description;
    this.currentGoal.timeRemaining = duration.concat(":00");
  }

  close() {
    this.modalRef.close();
  }

  onTaskCreation(taskRef: MdbModalRef<CreateGoalTaskComponent>): void {
    taskRef.onClose.subscribe((newTask: string | null) => {
      if (newTask) this.currentGoal['tasks']?.push({
        title: newTask,
        complete: false
      })
    })
  }

  addGoalTask() {
    this.taskModalRef = this.taskModalService.open(CreateGoalTaskComponent, {
      animation: true,
      backdrop: true,
      data: null,
      containerClass: 'modal top fade modal-backdrop',
      ignoreBackdropClick: false,
      keyboard: true,
      modalClass: 'modal-xl modal-dialog-centered w-50',
    })

    this.onTaskCreation(this.taskModalRef)
  }

  addNewGoal() {
    this.formModel.markAllAsTouched();

    if (this.formModel.invalid) return;

    // Extracting duration timeparts (hours & minutes)
    const [hours, minutes] = this.getFormControl('duration').value.split(":")

    // Business rule [Goals must have a minumum duration of 25 minutes]
    if (+hours === 0 && +minutes < 25) {
      this.goalManagementService.showErrorMessage("Create New Goal", "Cannot set a goal with a duration less than 25 minutes")
      return;
    }

    this.setGoalValues(
      this.getFormControl('title').value,
      this.getFormControl('duration').value,
      this.getFormControl('description').value
    )

    // console.log(this.currentGoal);
    this.goalManagementService.insertNewGoal(this.currentGoal);

    this.close();
  }
}

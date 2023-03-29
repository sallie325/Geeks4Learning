import { Injectable } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { AttendanceService } from 'src/app/attendance-register/services/attendance.service';
import { CaptureGoalsComponent } from '../modals/capture-goals/capture-goals.component';
import { CreateGoalTaskComponent } from '../modals/create-goal-task/create-goal-task.component';
import { GoalModel } from '../models/goal-model';

@Injectable({
  providedIn: 'root',
})
export class CaptureGoalService {
  private modalDialog!: MdbModalRef<CaptureGoalsComponent>;
  private taskModalRef!: MdbModalRef<CreateGoalTaskComponent>;
  private currentGoal!: GoalModel;

  constructor(
    private modalService: MdbModalService,
    private taskModalService: MdbModalService,
    private attendanceService: AttendanceService
  ) { }

  openCaptureGoal(attendance?: any) {
    this.modalDialog = this.modalService.open(CaptureGoalsComponent, {
      animation: true,
      backdrop: true,
      data: { attendance: attendance ? attendance : null },
      containerClass: 'modal top fade modal-backdrop',
      ignoreBackdropClick: false,
      keyboard: true,
      modalClass: 'modal-xl modal-dialog-centered w-50',
    });
  }

  openAddGoalTaskDialog(goalObject: GoalModel) {
    // Set the current goal reference
    this.currentGoal = goalObject;

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

  onTaskCreation(taskRef: MdbModalRef<CreateGoalTaskComponent>): void {
    taskRef.onClose.subscribe((newTask: string | null) => {
      if (newTask) this.currentGoal['tasks']?.push({
        title: newTask,
        complete: false
      })
    })
  }

  getModalDialog(): MdbModalRef<CaptureGoalsComponent> {
    return this.modalDialog;
  }
}

import { Injectable } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { AttendanceService } from 'src/app/attendance-register/services/attendance.service';
import { CaptureGoalsComponent } from '../../modals/capture-goals/capture-goals.component';
import { CreateGoalTaskComponent } from '../../modals/create-goal-task/create-goal-task.component';
import { GoalModel, viewType } from '../../models/goal-model';
import { GoalManagementService } from '../data/goal-management.service';

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
    private goalManagementService: GoalManagementService,
    private attendanceService: AttendanceService
  ) { }

  openCaptureGoalDialog(attendance?: any) {
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

  openAddGoalTaskDialog(goalObject: GoalModel, view: viewType = "create") {
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

    this.onTaskCreation(this.taskModalRef, view)
  }

  onTaskCreation(taskRef: MdbModalRef<CreateGoalTaskComponent>, view: viewType): void {
    taskRef.onClose.subscribe((newTask: string | null) => {
      if (newTask) {
        this.currentGoal['tasks']?.push({
          title: newTask,
          complete: false,
          goalId: this.currentGoal.id
        })
        /**
         * If creating a task for an existing goal
         * in the view-goal, update database
        */
        if (view === "view") {
          this.goalManagementService.updateGoal(this.currentGoal)
          .subscribe((updatedGoal: GoalModel) => {
            console.log(updatedGoal)
          })
        }
      }
    })
  }

  getModalDialog(): MdbModalRef<CaptureGoalsComponent> {
    return this.modalDialog;
  }
}

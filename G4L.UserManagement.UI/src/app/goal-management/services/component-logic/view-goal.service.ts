import { Injectable } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ViewSelectedGoalComponent } from '../../modals/views/view-selected-goal/view-selected-goal.component';
import { GoalModel } from '../../models/goal-model';

@Injectable({
  providedIn: 'root'
})
export class ViewGoalService {
  modalRef!: MdbModalRef<ViewSelectedGoalComponent>

  constructor(private modalService: MdbModalService) { }

  viewSelectedGoal(goal: GoalModel, ignoreBackdropClick: boolean = false): void {
    this.modalRef = this.modalService.open(ViewSelectedGoalComponent, {
      data: { goal: goal },
      containerClass: 'modal top fade modal-backdrop',
      ignoreBackdropClick: ignoreBackdropClick,
      modalClass: 'modal-xl modal-dialog-centered w-50',
    });
  }

  closeViewedGoal() {
    this.modalRef?.close()
  }
}

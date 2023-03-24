import { Injectable } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { CaptureGoalsComponent } from '../capture-goals/capture-goals.component';

@Injectable({
  providedIn: 'root'
})
export class CaptureGoalService {
  private modalDialog!: MdbModalRef<CaptureGoalsComponent>;

  constructor(private modalService: MdbModalService) { }

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

  getModalDialog(): MdbModalRef<CaptureGoalsComponent> {
    return this.modalDialog;
  }
}

import { Injectable } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { Subject } from 'rxjs';
import { CommentComponent } from '../modals/comment/comment.component';
import { goalStatus } from '../models/goal-model';

@Injectable({
  providedIn: 'root'
})
export class GoalCommentService {
  modalRef!: MdbModalRef<CommentComponent>
  commentSubject!: Subject<string | null>

  constructor(private modalService: MdbModalService) {
    this.commentSubject = new Subject<string | null>();
  }

  openCommentDialog(commentType: goalStatus): Subject<string | null> {
    this.modalRef = this.modalService.open(CommentComponent, {
      data: {
        commentType: commentType
      },
      containerClass: 'modal top fade modal-backdrop',
      ignoreBackdropClick: true,
      modalClass: 'modal-xl modal-dialog-centered w-50',
    });

    // Because of the [async] nature of Subject, the return value will be executed first!
    return this.commentSubject;
  }

  commentDialogUserAction(action: string | null) {
    // Emit user-action
    this.commentSubject.next(action)
  }

  closeCommentDialog(userResponse: string | null) {
    this.commentDialogUserAction(userResponse)
    this.modalRef?.close()
  }
}

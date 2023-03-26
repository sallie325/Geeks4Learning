import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { GoalCommentService } from '../../services/goal-comment.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  formGroup: FormGroup = new FormGroup({
    comment: new FormControl(null, [Validators.required])
  });

  constructor(private goalCommentService: GoalCommentService) { }

  ngOnInit(): void { }

  getFormControl(name: string): AbstractControl {
    return this.formGroup.controls[name];
  }

  isFormControlInvalid(name: string): boolean {
    return this.getFormControl(name).invalid;
  }

  isFormControlTouched(name: string): boolean {
    return this.getFormControl(name).touched;
  }

  saveUserComment(): void {
    this.formGroup.markAllAsTouched();

    if (this.formGroup.invalid) {
      return;
    }

    this.closeDialog(this.getFormControl('comment').value)
  }

  closeDialog(userResponse: string | null = null) {
    this.goalCommentService.closeCommentDialog(userResponse)
  }
}

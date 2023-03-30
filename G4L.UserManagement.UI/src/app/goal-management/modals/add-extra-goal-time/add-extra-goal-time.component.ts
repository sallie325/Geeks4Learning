import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { GoalButtonActionService } from '../../services/component-logic/goal-button-action.service';

@Component({
  selector: 'app-add-extra-goal-time',
  templateUrl: './add-extra-goal-time.component.html',
  styleUrls: ['./add-extra-goal-time.component.css']
})
export class AddExtraGoalTimeComponent implements OnInit {
  extraTimeFormGroup: FormGroup = new FormGroup({
    Time: new FormControl(null, [Validators.required])
  })

  constructor(private goalButtonActionService: GoalButtonActionService) { }

  ngOnInit(): void { }

  getFormControl(name: string): AbstractControl {
    return this.extraTimeFormGroup.controls[name];
  }

  isFormControlInvalid(name: string): boolean {
    return this.getFormControl(name).invalid;
  }

  isFormControlTouched(name: string): boolean {
    return this.getFormControl(name).touched;
  }

  addExtraTime() {
    this.extraTimeFormGroup.markAllAsTouched();

    if (this.extraTimeFormGroup.invalid) return;

    this.goalButtonActionService.getCloseAddMoreTimeModalRef()
      .close(this.getFormControl("Time").value)
  }

  closeModal() {
    this.goalButtonActionService.getCloseAddMoreTimeModalRef()
      .close(null)
  }
}

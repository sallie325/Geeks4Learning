import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { ToastrService } from 'ngx-toastr';
import { AttendenceService } from '../services/attendence.service';


@Component({
  selector: 'app-capture-goals',
  templateUrl: './capture-goals.component.html',

})
export class CaptureGoalsComponent implements OnInit {

  formModel: FormGroup= new FormGroup({});
  UserId: any;


  ngOnInit(): void {
   
    this.buildform();

  }
 
  constructor(public modalRef: MdbModalRef<CaptureGoalsComponent>, public attendanceService: AttendenceService, public toastrService: ToastrService, private formBuilder: FormBuilder,) {

  }

  buildform() {

    this.formModel = this.formBuilder.group({
      GoalSummary: [],
      Goal_Description: [],
      Time_limit: [],

    });



  }

  UpdateGoals() {

    this.formModel.markAllAsTouched();

    if (this.formModel.invalid) {
      return;
    }


    this.attendanceService.UpdateGoals(this.formModel.value).subscribe(
      () => {
        this.toastrService.success(`${this.formModel.value?.GoalSummary} ${this.formModel.value?.Goal_Description} ${this.formModel.value?.Time_limit} was successfully updated.`);
        this.modalRef.close(true);
      },
      (error) => {
       
      }
    );
    console.log(this.formModel.value)
  }




  close() {
    this.modalRef.close();
  }


}

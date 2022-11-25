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
  id: any;


  ngOnInit(): void {
   
  

  }
 
  constructor(public modalRef: MdbModalRef<CaptureGoalsComponent>, public attendanceService: AttendenceService, public toastrService: ToastrService, private formBuilder: FormBuilder,) {

  }

  buildform() {

    this.formModel = this.formBuilder.group({
      id: ['3CE34AE1-BA2B-45CA-6EAA-08DACDE0452E'],
      goal_summary: ["dsfsfsdfsf"],
      goal_Description: ["guigyguiygyg"],
      time_Limit: ["ygughuigiughui"],

    });



  }

  UpdateGoals() {

    this.formModel.markAllAsTouched();

    if (this.formModel.invalid) {
      return;
    }

    this.attendanceService.UpdateGoals(this.formModel.value,).subscribe(
      () => {
        this.toastrService.success(`${this.formModel.value?.goal_summary} ${this.formModel.value?.goal_Description} ${this.formModel.value?.time_Limit} was successfully updated.`);
        this.modalRef.close(true);
      },
      (error) => {

      
       
      }
    );
    console.log(this.formModel.value)
    console.log(this.id.value)
  }




  close() {
    this.modalRef.close();
  }


}

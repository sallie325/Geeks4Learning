import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from 'src/app/usermanagement/login/services/token.service';
import { AttendenceService } from '../services/attendence.service';


@Component({
  selector: 'app-capture-goals',
  templateUrl: './capture-goals.component.html',

})
export class CaptureGoalsComponent implements OnInit {
  formModel: FormGroup = new FormGroup({})
  time_Limit: any
  attendanceId: any
  ngOnInit(): void {
    this.buildForm();
  }
  buildForm() {
    this.formModel = this.formBuilder.group({
      id: [this.attendanceId],
      goal_Description: [],
      goal_summary: [],
      time_Limit: []
    })
  }
  UpdateGoals() {
    this.attendanceService.UpdateAttendanceGoals(this.formModel.value).subscribe(_=>{
      
    })
    console.log(this.formModel.value);
  }


  constructor(private attendanceService: AttendenceService, public modalRef: MdbModalRef<CaptureGoalsComponent>, private formBuilder: FormBuilder) {


  }

  close() {
    this.modalRef.close();
  }


}

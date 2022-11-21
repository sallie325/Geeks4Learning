import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { any } from 'ramda';
import { AttendanceStatus } from 'src/app/shared/global/attendance-type';
import { contants } from 'src/app/shared/global/global.contants';
import { UserService } from 'src/app/usermanagement/services/user.service';
import { AttendenceService } from '../../services/attendence.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  attendences: any[] = [];
  users: any;
  ids: any;
  testing: FormGroup = new FormGroup({})
  date: any;
  // testing data

  constructor(private formBuider: FormBuilder, private attendenceService: AttendenceService, private userService: UserService) { }

  ngOnInit() {
    this.getAttendences(0, 10);
    this.date = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, -1)
  }
  getAttendences(skip: any, take: any) {
    this.attendenceService.getPagedAttendance(skip, take).subscribe((res: any) => {
      this.attendences = res;
      console.log(this.attendences);
    })
    this.userService.getPagedUsers(skip, take).subscribe((res: any) => {
      this.users = res;
      res.forEach((element: any) => {
        if (element.role == "Learner") {
          this.ids = element.id
          this.testing = this.formBuider.group({
            userId: [element.id],
            date: [this.date],
            status: [AttendanceStatus.Absent]
          })
          this.attendenceService.captureDetails(this.testing.value).subscribe(_=>{

          })
          console.log(this.testing.value)
          console.log(this.ids);
        }
      });
    })

  }

  getStatus(status: any): any {
    switch (status) {
      case AttendanceStatus.Present:
        return 'present'
      case AttendanceStatus.Absent:
        return 'absent'
      case AttendanceStatus.Late:
        return 'late'
      case AttendanceStatus.Leave:
        return 'leave'
      default:
        return undefined;
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { any } from 'ramda';
import { AttendanceType } from 'src/app/shared/global/attendance-type';
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
  time: any | null;
  date: any | null;
  constructor(private attendenceService: AttendenceService, private userService: UserService) { }

  ngOnInit() {
    this.getAttendences(0, 10);
  }
  getAttendences(skip: any, take: any) {
    this.attendenceService.getPagedAttendance(skip, take).subscribe((res: any) => {
      this.attendences = res;
      console.log(this.attendences);
    })
    this.userService.getPagedUsers(skip, take).subscribe((res: any) => {
      this.users = res;
    })
  }

  getStatus(status: any): any {
    switch (status) {
      case AttendanceType.Present:
        return 'present'
      case AttendanceType.Absent:
        return 'absent'
      case AttendanceType.Late:
        return 'late'
      case AttendanceType.Leave:
        return 'leave'
      default:
        return undefined;
    }
  }

}

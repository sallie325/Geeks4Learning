import { LeaveTypes } from './../../shared/global/leave-types';
import { LeaveDayType } from './../../shared/global/leave-day-type';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from 'src/app/usermanagement/login/services/token.service';
import { LeaveService } from '../services/leave.service';
import { LeaveStatus } from 'src/app/shared/global/leave-status';
import { HalfDaySchedule } from 'src/app/shared/global/half-day-schedule';

@Component({
  selector: 'app-leave-request',
  templateUrl: './leave-request.component.html',
  styleUrls: ['./leave-request.component.css']
})
export class LeaveRequestComponent implements OnInit {

  formModel: any;
  userId: any;
  daysAvailable: number | undefined = 0;
  daysRemaining: number = 0;

  keys = Object.keys;

  leaveTypes = LeaveTypes;
  daysType = LeaveDayType;
  halfDaySchedule = HalfDaySchedule;

  negativeDays: boolean = false;

  // leaveSchedule: { date: Date; leaveDayType: LeaveDayType.All_day; halfDaySchedule: HalfDaySchedule.None; }[] = []; // Might destroy this
  leaveBalances: any[] = [];

  constructor(
    public modalRef: MdbModalRef<LeaveRequestComponent>,
    private formBuilder: FormBuilder,
    private leaveService: LeaveService,
    private toastr: ToastrService,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    let user: any = this.tokenService.getDecodeToken();
    this.userId = user.id;
    this.buildForm();
  }

  buildForm() {
    this.formModel = this.formBuilder.group({
      userId: [this.userId],
      leaveType: [LeaveTypes.Please_Select_A_Leave , Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      leaveDayDuration: [ LeaveDayType.All_day ],
      leaveSchedule: this.formBuilder.array([]),
      comments: [''],
      usedDays: ['', Validators.required ],
      status: [ LeaveStatus.Pending ],
      approvers: this.formBuilder.array([
        {
          "userId": "156b5e89-99ad-47aa-2895-08da80ffdfed",
          "status": "Pending",
          "comments": ""
        },
        {
          "userId": "d0ad240b-dbc2-4458-65ce-08da9afed6cb",
          "status": "Pending",
          "comments": ""
        }
      ]), // How do we know who will approver
      documents: [[]]
    });
  }

  leaveSchedule(data?: any) {
    return this.formBuilder.group({
      date: [data?.date, Validators.required],
      leaveDayType: [LeaveDayType.Half_day],
      halfDaySchedule: [HalfDaySchedule.None]
    });
  }

  calculateDaysRequested() {
    let difference = this.getBusinessDatesCount(this.formModel.get('startDate').value, this.formModel.get('endDate').value);
    this.formModel.get('usedDays').patchValue(difference);
    return Number(this.formModel.get('usedDays').value);
  }

  getBusinessDatesCount(startDate: any, endDate: any) {
    let count = 0;
    let curDate = +startDate;
    while (curDate <= +endDate) {
      const dayOfWeek = new Date(curDate).getDay();
      const isWeekend = (dayOfWeek === 6) || (dayOfWeek === 0);
      if (!isWeekend) {
        count++;
      }
      curDate = curDate + 24 * 60 * 60 * 1000
    }
    return count;
  }

  calculateDaysRemaining(): number | undefined {
    this.negativeDays = false;
    var leaveType = this.formModel.get('leaveType').value;
    switch (leaveType) {
      case LeaveTypes.Annual:
      case LeaveTypes.Family_Responsibility:
      case LeaveTypes.Sick:
        this.daysAvailable = this.leaveBalances.find(x => x.balanceType === leaveType).remaining;
        break;
      default:
        return 0;
    }

    if (this.daysAvailable) {
      this.daysRemaining = this.daysAvailable - this.calculateDaysRequested();

      // display the error message
      if (this.daysRemaining < 0) {
        this.negativeDays = true;
      }

      return this.daysRemaining;
    }

    return undefined;
  }

  applyForLeave() {
    console.log(this.formModel);

    // this.leaveService.applyForLeave(this.formModel.value).subscribe(_ => {
    //   this.toastr.success(`Your leave was successfully created.`);
    //   this.modalRef.close(true);
    // });
  }

  onOptionsSelected(event?: any) {
    const startDate = new Date(this.formModel.get('startDate').value);
    const newDate = new Date(startDate.setDate(startDate.getDate() - 1));

    switch (this.formModel.get('leaveDayDuration').value) {
      case LeaveDayType.Half_day:
        for (let index = 0; index < this.calculateDaysRequested(); index++) {
          this.formModel.get('leaveSchedule').push(this.leaveSchedule({
            date: newDate.setDate(newDate.getDate() + 1)
          }));
        }
        break;
      default:
        break;
    }
  }

  isAllowed(leaveType: any) {
    switch (leaveType) {
      case LeaveTypes.Annual:
      case LeaveTypes.Sick:
      case LeaveTypes.Family_Responsibility:
        if (this.leaveBalances.find(x => x.balanceType === leaveType).remaining === 0) {
          return true;
        }
        return false;
      case LeaveTypes.Unpaid:
        return false;
      default:
        return true;
    }
  }

  isDefault(leaveType: any) {
    switch (leaveType) {
      case LeaveTypes.Please_Select_A_Leave:
        return true;
      default:
        return false;
    }
  }

  handleFileInput(files: FileList) {
    console.log(this.formModel);
    console.log(files);
    this.formModel.get('documents').value = files.item(0);
  }

  getFormControl(form: any, formControlName: string): any {
    return form.controls[formControlName];
  }

  isAllDay() {
    switch (this.formModel.get('leaveDayDuration').value) {
      case LeaveDayType.All_day:
        return true;
      default:
        return false;
    }
  }

  dateRangeChange() {
    this.formModel.get('leaveSchedule').controls = [];
    this.formModel.get('leaveDayDuration').patchValue(LeaveDayType.All_day);
  }

  close() {
    this.modalRef.close();
  }

}

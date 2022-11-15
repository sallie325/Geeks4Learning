import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { contants } from 'src/app/shared/global/global.contants';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AttendanceType } from 'src/app/shared/global/attendance-type';
import { TokenService } from './services/token.service';
import { AttendenceService } from 'src/app/attendence-register/services/attendence.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  year: any
  month: any
  day: any
  hours: any
  minutes: any
  seconds: any
  ms: any;
  date: any;
  loginForm: FormGroup = new FormGroup({
    Email: new FormControl('', [Validators.required, Validators.email]),
    Password: new FormControl('', Validators.required),
  });
  holdingArray: FormGroup = new FormGroup({});
  serverErrorMessage: any;
  result: any;
  loginTime: any = '';
  userId: any = '156b5e89-99ad-47aa-2895-08da80ffdfed';

  constructor(private attendanceService: AttendenceService, private tokenService: TokenService, private formBuilder: FormBuilder, private userService: UserService, private router: Router, private toastr: ToastrService) { }
  ngOnInit(): void {

  }

  login() {
    // display the error message
    this.loginForm.markAllAsTouched();
    
    // stop the code running
    if (this.loginForm.invalid) {
      return;
    }
    this.year = new Date().getFullYear();
    this.month = new Date().getMonth();
    this.day = new Date().getDate();
    this.hours = new Date();
    this.minutes = new Date().getMinutes();
    this.seconds = new Date().getSeconds();
    this.ms = new Date().getMilliseconds();
    var date: any = new Date(this.year, this.month, this.day, this.hours.getHours(), this.minutes, this.seconds, this.ms);
    this.date = date.toDateString();
    this.loginTime =  date.toTimeString();
    this.buildData();
    console.log(this.date);
    this.sendDetails();
    // making a backend call
    this.userService
      .authenticate(this.loginForm.value)
      .subscribe((response: any | undefined) => {
        // save the token
        sessionStorage.setItem(contants.token, response?.token);
        sessionStorage.setItem(contants.username, `${response?.name} ${response?.surname}`);
        sessionStorage.setItem(contants.role, response?.role);
        sessionStorage.setItem("date",this.date);
        sessionStorage.setItem(contants.time, this.loginTime);
        // route to the master layout
        this.router.navigate(['/dashboard']);

      },
        error => {
          this.loginForm.controls['Email'].setErrors({ isUserNameOrPasswordIncorrect: true });
          this.loginForm.controls['Password'].setErrors({ isUserNameOrPasswordIncorrect: true });
          this.loginForm.updateValueAndValidity();
          this.serverErrorMessage = error?.message;
        });
    

  }
  sendDetails() {
    this.attendanceService.captureDetails(this.holdingArray.value).subscribe(_ => {
      alert("Signed in");
    });
  }
  buildData() {
    this.holdingArray = this.formBuilder.group({
      userId: [this.userId],
      attendanceDate: [this.date],
      loginTime: [this.date],
      logoutTime: [''],
      status: [AttendanceType.Late]
    });
  }

  openSocialMediaOnNewTab(url: string) {
    window.open(url, "_blank");
  }

}

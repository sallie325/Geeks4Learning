import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { contants } from 'src/app/shared/global/global.contants';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from './services/token.service';
import { AttendenceService } from 'src/app/attendence-register/services/attendence.service';
import { Console } from 'console';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
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
  captureGoalsTime: any;

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
    var date: any = new Date();
    var tzoffset = (date).getTimezoneOffset() * 60000;
    this.date = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1);
    this.loginTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1);
    this.captureGoalsTime = new Date(Date.now()).getMinutes() + 1;
    console.log(this.captureGoalsTime);
    
    // making a backend call
    this.userService
      .authenticate(this.loginForm.value)
      .subscribe((response: any | undefined) => {
        // save the token
        sessionStorage.setItem(contants.token, response?.token);
        sessionStorage.setItem(contants.username, `${response?.name} ${response?.surname}`);
        sessionStorage.setItem(contants.role, response?.role);
        sessionStorage.setItem("date", this.date);
        sessionStorage.setItem(contants.time, this.loginTime);
        sessionStorage.setItem("times", this.captureGoalsTime)
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
  openSocialMediaOnNewTab(url: string) {
    window.open(url, "_blank");
  }

}

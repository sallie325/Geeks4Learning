import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { contants } from 'src/app/shared/global/global.contants';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from './services/token.service';
import { AttendenceService } from 'src/app/attendence-register/services/attendence.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  // date: any;
  // loginTime: any = '';
  serverErrorMessage: any;
  result: any;
  userId: any = '156b5e89-99ad-47aa-2895-08da80ffdfed';
  captureGoalsTime: any;
  loginForm!: FormGroup;
  holdingArray: FormGroup = new FormGroup({});

  constructor(private attendanceService: AttendenceService, private tokenService: TokenService, private formBuilder: FormBuilder, private userService: UserService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      Email: new FormControl(null, [Validators.required, Validators.email]),
      Password: new FormControl(null, Validators.required),
    });
  }

  get currentDateTime(): string {
    let tzoffset = Math.abs(new Date().getTimezoneOffset() * 60000);
    return (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1);
  }

  get isFormInvalid(): boolean { return this.loginForm.invalid; }

  getFormControl(control: String) { return this.loginForm.controls[`${control}`]; }

  isValid(key: String): Boolean { return !this.getFormControl(key).invalid }

  isTouched(key: String): Boolean { return this.getFormControl(key).touched; }

  login() {
    // display the error message
    this.loginForm.markAllAsTouched();

    // stop the code running
    if (this.isFormInvalid) return;

    // var date: any = new Date();
    // console.log("Date", new Date().getTimezoneOffset());
    // console.log("Timezone", tzoffset)
    // this.date = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1);

    this.captureGoalsTime = new Date(Date.now()).getMinutes() + 1;

    // making a backend call
    this.userService
      .authenticate(this.loginForm.value)
      .subscribe((response: any | undefined) => {
        // save the token
        sessionStorage.setItem(contants.token, response?.token);
        sessionStorage.setItem(contants.username, `${response?.name} ${response?.surname}`);
        sessionStorage.setItem(contants.role, response?.role);
        sessionStorage.setItem(contants.time, this.currentDateTime);
        sessionStorage.setItem("date", this.currentDateTime);
        sessionStorage.setItem("times", this.captureGoalsTime)

        // route to the master layout
        this.router.navigate(['/dashboard']);
      },
        error => {
          this.getFormControl('Email').setErrors({ isUserNameOrPasswordIncorrect: true });
          this.getFormControl('Password').setErrors({ isUserNameOrPasswordIncorrect: true });
          this.loginForm.updateValueAndValidity();
          this.serverErrorMessage = error?.message;
        });
  }
}

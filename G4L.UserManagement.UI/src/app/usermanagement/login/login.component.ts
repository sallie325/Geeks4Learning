import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { contants } from 'src/app/shared/global/global.contants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {}

  login() {
    // display the error message
    this.loginForm.markAllAsTouched();

    // stop the code running
    if (this.loginForm.invalid) {
      return;
    }

    // making a backend call
    this.userService
      .authenticate(this.loginForm.value)
      .subscribe((response: any | undefined) => {
        // save the token
        sessionStorage.setItem(contants.token, response?.token);
        sessionStorage.setItem(contants.username, `${response?.name} ${response?.surname}`);
        sessionStorage.setItem(contants.role, response?.role);

        // route to the master layout
        this.router.navigate(['/dashboard']);
      });
  }
}

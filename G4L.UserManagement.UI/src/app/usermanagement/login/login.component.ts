import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { contants } from 'src/app/shared/global/global.contants';
import { Router } from '@angular/router';
import {faFacebook, faTwitter, faInstagram, faLinkedin  } from '@fortawesome/free-brands-svg-icons';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    Email: new FormControl('', [Validators.required, Validators.email]),
    Password: new FormControl('', Validators.required),
  });

  // faFacebook = faFacebook ;
  // faTwitter = faTwitter ;
  // faInstagram = faInstagram ;
  // faLinkedin = faLinkedin ;

  constructor(private userService: UserService, private router: Router, private toastr: ToastrService) {}

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
      .subscribe({
       next: (response: any | undefined) => {
        // save the token
        console.log(response);
        this.toastr.success('Login Successful', 'Authentication successful');
        sessionStorage.setItem(contants.token, response?.token);
        sessionStorage.setItem(contants.username, `${response?.name} ${response?.surname}`);
        sessionStorage.setItem(contants.role, response?.role);

        // route to the master layout
        this.router.navigate(['/dashboard']);

       },
       error: (err: HttpErrorResponse) => {
        console.log(err.message);
        //this.showError = true;
        this.toastr.error('Invaid email or password', 'Login fail')

       }
      });
  }
}

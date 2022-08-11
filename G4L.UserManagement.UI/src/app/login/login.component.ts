import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faCircleNodes } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from '../shared/api.service';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  heading = "login works!";
  faCicle = faCircleNodes ;
  title = "Geeks for learning "
  formModel!: any;
  constructor(private fb: FormBuilder, private authenticationService: AuthenticationService, private router: Router) {}

  ngOnInit(): void {
    this.formModel = this.fb.group({
      Email: ['', Validators.required],
      Password: ['', Validators.required],
    });
  }

  login(form: any) {

    this.formModel.markAllAsTouched();

    if (this.formModel.invalid) {
      return;
    }

    this.authenticationService.authenticate(this.formModel.value);

    this.router.navigateByUrl('/dashboard'); 
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { faCircleNodes } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from '../shared/api.service';

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
  constructor(private fb: FormBuilder, private apiService: ApiService) {}

  ngOnInit(): void {
    this.formModel = this.fb.group({
      Email: ['', Validators.required],
      Password: ['', Validators.required],
    });
  }

  login(form: any) {
    console.log(form.get('Email'));

    this.formModel.markAllTouched();

    if (this.formModel.invalid) {
      return;
    }

    this.apiService.get('User').subscribe((response: any) => {
      console.log(response);
    });


  }
}

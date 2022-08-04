import { ApiService } from './../shared/api.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  heading = 'register works!';
  faAngle = faAngleRight;
  formModel: any;

  constructor(private fb: FormBuilder, private apiService: ApiService) {}

  ngOnInit(): void {
    this.formModel = this.fb.group({
      Name: ['', Validators.required],
      Surname: ['', Validators.required],
      IdNumber: ['', Validators.required],
      Phone: ['', Validators.required],
      Email: ['', Validators.required],
      Client: ['', Validators.required],
      Career: ['', Validators.required],
      Roles: ['', Validators.required],
      LearnershipStartDate: ['', Validators.required],
      Password: ['', Validators.required],
    });
  }

  register(form: any) {
    console.log(form.get('Name'));

    this.formModel.markAllTouched();

    if (this.formModel.invalid) {
      return;
    }

    this.apiService.post('users', this.formModel.value).subscribe((response: any) => {
      console.log(response);
    });


  }


}

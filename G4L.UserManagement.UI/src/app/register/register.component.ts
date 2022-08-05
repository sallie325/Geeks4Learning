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
      Phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(12)]],
      Email: ['', Validators.required],
      Client: ['', Validators.required],
      Career: [0, Validators.required],
      Roles: [0, Validators.required],
      LearnershipStartDate: ['', Validators.required],
      Password: ['', Validators.required],
    });
  }

  register(form: any) {
    console.log(form.get('Name'));

    this.formModel.markAllAsTouched();

    // ack needs to be removed at some point. FIND BETTER WAY, US PIPE IF NEEDS BE!!!!
    this.formModel.get('Career').patchValue(Number(this.formModel.get('Career').value));
    this.formModel.get('Roles').patchValue(Number(this.formModel.get('Roles').value));

    if (this.formModel.invalid) {
      return;
    }

    this.apiService.post('User', this.formModel.value).subscribe((response: any) => {
      console.log(response);
    });


  }

  toNumber(number: any) {
    return Number(number);
  }

}

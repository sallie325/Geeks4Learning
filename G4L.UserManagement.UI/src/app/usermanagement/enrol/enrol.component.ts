import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-enrol',
  templateUrl: './enrol.component.html',
  styleUrls: ['./enrol.component.css']
})
export class EnrolComponent implements OnInit {

  formModel: any;

  constructor(private formBuilder: FormBuilder, private userService: UserService) {}

  ngOnInit(): void {
    this.formModel = this.formBuilder.group({
      Name: ['', Validators.required],
      Surname: ['', Validators.required],
      IdNumber: ['', Validators.required],
      Phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(12)]],
      Email: ['', Validators.required],
      Client: ['', Validators.required],
      Career: ['', Validators.required],
      Roles: ['', Validators.required],
      LearnershipStartDate: ['', Validators.required],
      Password: ['', Validators.required],
    });
  }

  addUser() {

    this.formModel.markAllAsTouched();

    // Hack needs to be removed at some point. FIND A BETTER WAY, USE PIPE IF NEEDS BE!!!!
    this.formModel.get('Career').patchValue(Number(this.formModel.get('Career').value));
    this.formModel.get('Roles').patchValue(Number(this.formModel.get('Roles').value));

    if (this.formModel.invalid) {
      return;
    }

    this.userService.addUser('User', this.formModel.value).subscribe((response: any) => {
      console.log(response);
    });
  }
}

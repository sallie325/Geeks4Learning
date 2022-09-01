import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { contants } from 'src/app/shared/global/global.contants';
import { Roles } from 'src/app/shared/global/roles';
import { Streams } from 'src/app/shared/global/streams';
import { CustomValidators } from 'src/app/shared/validators/custom-validators';
import { environment } from 'src/environments/environment';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-enrol',
  templateUrl: './enrol.component.html',
  styleUrls: ['./enrol.component.css'],
})
export class EnrolComponent implements OnInit {
  formModel: any;
  // formModel: FormGroup = new FormGroup({});

  keys = Object.keys;

  roles = Roles;
  streams = Streams;
  user: any | null = null;
  userRole: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    public modalRef: MdbModalRef<EnrolComponent>
  ) {}

  ngOnInit(): void {
    this.buildForm(this.user);
    this.userRole = sessionStorage.getItem(contants.role);
  }

  buildForm(user?: any) {
    this.formModel = this.formBuilder.group({
      Id: [user?.id],
      Name: [user?.name, [Validators.required, CustomValidators.names]],
      Surname: [user?.surname, [Validators.required, CustomValidators.names]],
      IdNumber: [
        user?.idNumber,
        [Validators.required, CustomValidators.IdNumber],
      ],
      Phone: [user?.phone, [Validators.required, CustomValidators.phone]],
      Email: [user?.email, [Validators.required, CustomValidators.email]],
      Role: [user?.role || Roles.Please_select_a_role, Validators.required],
      Career: [user?.career || Streams.Please_select_a_stream],
      Client: [user?.client],
      LearnershipStartDate: [
        user?.learnershipStartDate
          ? formatDate(new Date(user?.learnershipStartDate), 'yyyy-MM-dd', 'en')
          : formatDate(new Date('0001-01-01'), 'yyyy-MM-dd', 'en'),
      ],
      Password: [environment.defaultPassword, Validators.required],
    });
  }

  addUser() {
    this.formModel.markAllAsTouched();

    if (this.formModel.invalid) {
      return;
    }

    this.removeDropDownDefaults();

    this.userService.addUser('User', this.formModel.value).subscribe(() => {
      this.modalRef.close(true);
    });
  }

  updateUser() {
    this.formModel.markAllAsTouched();

    if (this.formModel.invalid) {
      return;
    }

    this.removeDropDownDefaults();

    console.log(this.formModel);

    this.userService.updateUser('User', this.formModel.value).subscribe(() => {
      this.modalRef.close(true);
    });
  }

  removeDropDownDefaults() {
    if (this.formModel.controls['Career'].value === Streams.Please_select_a_stream) {
      this.formModel.controls['Career'].patchValue('None');
    }
  }

  close() {
    this.modalRef.close();
  }

  isAllowed(role: any) {
    if (this.userRole == Roles.Super_Admin) {
      switch (role) {
        case Roles.Super_Admin:
          return true;
        default:
          return false;
      }
    } else if (this.userRole == Roles.Admin) {
      switch (role) {
        case Roles.Super_Admin:
        case Roles.Admin:
          return true;
        default:
          return false;
      }
    } else {
      return true;
    }
  }

  isLearner() {
    const role = this.formModel.controls['Role'].value;
    switch (role) {
      case Roles.Learner:
        return true;
      case Roles.Trainer:
        this.setG4LDefaults();
        return false;
      case Roles.Admin:
      case Roles.Super_Admin:
        this.setG4LDefaults();
        return false;
      default:
        return false;
    }
  }

  setG4LDefaults() {
    const today = Date.now();

    this.formModel.controls['Career'].patchValue(Streams.Please_select_a_stream);
    this.formModel.controls['Client'].patchValue('');
    this.formModel.controls['LearnershipStartDate'].patchValue(
      formatDate(new Date(new Date(today).toISOString()), 'yyyy-MM-dd', 'en')
    );
  }

  isDefault(stream: any) {
    switch (stream) {
      case Streams.Please_select_a_stream:
      case Roles.Please_select_a_role:
        return true;
      default:
        return false;
    }
  }
}

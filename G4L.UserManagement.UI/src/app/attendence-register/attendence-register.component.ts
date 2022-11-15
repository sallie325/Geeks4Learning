import { Component, OnInit } from '@angular/core';
import { contants } from '../shared/global/global.contants';
import { Roles } from '../shared/global/roles';

@Component({
  selector: 'app-attendence-register',
  templateUrl: './attendence-register.component.html',
  styleUrls: ['./attendence-register.component.css']
})
export class AttendenceRegisterComponent implements OnInit {
  isAdmin: boolean | undefined;
  isTrainer: boolean | undefined;
  isLearner: boolean | undefined;
  constructor() { }

  ngOnInit(): void {
    const role = sessionStorage.getItem(contants.role);
    this.determinRole(role);
  }
  determinRole(role: string | null) {
    switch (role) {
      case Roles.Super_Admin:
      case Roles.Admin:
        this.isAdmin = true;
        break;
      case Roles.Trainer:
        this.isTrainer = true;
        break;
      case Roles.Learner:
        this.isLearner = true;
        break;
    }
  }
}

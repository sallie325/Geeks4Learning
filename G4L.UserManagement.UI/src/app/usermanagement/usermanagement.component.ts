import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-usermanagement',
  templateUrl: './usermanagement.component.html',
  styleUrls: ['./usermanagement.component.css'],
})
export class UsermanagementComponent implements OnInit {
  users: any;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getAllUsers()
    .subscribe(
      (response: any) => {
        this.users = response;
      }
    );
  }

}

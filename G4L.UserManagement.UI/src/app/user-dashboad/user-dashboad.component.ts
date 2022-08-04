import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-dashboad',
  templateUrl: './user-dashboad.component.html',
  styleUrls: ['./user-dashboad.component.css']
})
export class UserDashboadComponent implements OnInit {

   heading = "user-dashboad works!"; 
  constructor() { }

  ngOnInit(): void {
  }

}

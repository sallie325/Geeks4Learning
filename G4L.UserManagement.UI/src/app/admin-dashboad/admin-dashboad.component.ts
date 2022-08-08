import { Component, OnInit } from '@angular/core';
import { faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons';
//import { BreakpointObserver } from '@angular/cdk/layout';
//import { MatSidenav } from '@angular/material/sidenav';
//import { delay, filter } from 'rxjs/operators';
//import { NavigationEnd, Router } from '@angular/router';


@Component({
  selector: 'app-admin-dashboad',
  templateUrl: './admin-dashboad.component.html',
  styleUrls: ['./admin-dashboad.component.css']
})
export class AdminDashboadComponent implements OnInit {


  heading = "Admin-Dashboad works!";
  faAngle = faScrewdriverWrench;
  constructor() { }

  ngOnInit(): void {
  }

}

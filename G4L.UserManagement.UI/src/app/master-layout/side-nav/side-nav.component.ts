import { Component, OnInit } from '@angular/core';
import { faChartLine, faUsersGear, faPersonWalkingArrowRight, faUserGraduate } from '@fortawesome/free-solid-svg-icons';
import { contants } from 'src/app/shared/global/global.contants';
import { Roles } from 'src/app/shared/global/roles';
import { NavItem } from '../models/nav-item';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  username: string | null = null;
  role: string | null = null;
  navItems: NavItem[] = [];

  constructor() { }

  ngOnInit(): void {
    this.username = sessionStorage.getItem(contants.username);
    this.role = sessionStorage.getItem(contants.role);
    this.getNavItems();
  }

  getNavItems() {
    switch (this.role) {
      case Roles.Super_Admin:
        this.navItems = [
          {
            name: 'Dashboard',
            route: '/dashboard',
            faIcon: faChartLine
          },
          {
            name: 'User management',
            route: '/user-management',
            faIcon: faUsersGear
          },
          {
            name: 'Leave management',
            route: '/leave-management',
            faIcon: faPersonWalkingArrowRight
          },
          {
            name: 'IKM management',
            route: '/ikm-management',
            faIcon: faUserGraduate
          }
        ]
        break;
      case Roles.Admin:
        this.navItems = [
          {
            name: 'Dashboard',
            route: '/dashboard',
            faIcon: faChartLine
          },
          {
            name: 'User management',
            route: '/user-management',
            faIcon: faUsersGear
          },
          {
            name: 'Leave management',
            route: '/leave-management',
            faIcon: faPersonWalkingArrowRight
          },
          {
            name: 'IKM management',
            route: '/ikm-management',
            faIcon: faUserGraduate
          }
        ]
        break;
      case Roles.Trainer:
        this.navItems = [
          {
            name: 'Dashboard',
            route: '/dashboard',
            faIcon: faChartLine
          },
          {
            name: 'Leave management',
            route: '/leave-management',
            faIcon: faPersonWalkingArrowRight
          },
          {
            name: 'IKM management',
            route: '/ikm-management',
            faIcon: faUserGraduate
          }
        ]
        break;
      case Roles.Trainee:
        this.navItems = [
          {
            name: 'Dashboard',
            route: '/dashboard',
            faIcon: faChartLine
          },
          {
            name: 'Leave',
            route: '/leave-management',
            faIcon: faPersonWalkingArrowRight
          },
          {
            name: 'IKM',
            route: '/ikm-management',
            faIcon: faUserGraduate
          }
        ]
        break;
    }
  }

  logout() {
    //clear the sessionStorage and reload
    sessionStorage.clear();
    window.location.reload();
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { contants } from 'src/app/shared/global/global.contants';
import { Roles } from 'src/app/shared/global/roles';
import { EnrolComponent } from 'src/app/usermanagement/enrol/enrol.component';
import { TokenService } from 'src/app/usermanagement/login/services/token.service';
import { UserService } from 'src/app/usermanagement/services/user.service';
import { NavItem } from '../models/nav-item';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css'],
})
export class SideNavComponent implements OnInit {
  user: any;
  navItems: NavItem[] = [];
  modalDialog: MdbModalRef<EnrolComponent> | null = null;

  constructor(
    private modalService: MdbModalService,
    private userService: UserService,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    let user: any = this.tokenService.getDecodeToken();
    this.getUserDetails(user.id);
  }

  getUserDetails(userId: string | null) {
    this.userService.getUserById(userId).subscribe((response: any) => {
      this.user = response;
      this.getNavItems();
    });
  }

  getNavItems() {
    switch (this.user?.role) {
      case Roles.Super_Admin:
        this.navItems = [
          {
            name: 'Dashboard',
            route: '/dashboard',
            // faIcon: faChartLine
          },
          {
            name: 'User management',
            route: '/user-management',
            // faIcon: faUsersGear
          },
          {
            name: 'Leave management',
            route: '/leave-management',
            // faIcon: faPersonWalkingArrowRight
          },
          {
            name: 'IKM management',
            route: '/ikm-management',
            // faIcon: faUserGraduate
          },
        ];
        break;
      case Roles.Admin:
        this.navItems = [
          {
            name: 'Dashboard',
            route: '/dashboard',
            // faIcon: faChartLine
          },
          {
            name: 'User management',
            route: '/user-management',
            // faIcon: faUsersGear
          },
          {
            name: 'Leave management',
            route: '/leave-management',
            // faIcon: faPersonWalkingArrowRight
          },
          {
            name: 'IKM management',
            route: '/ikm-management',
            // faIcon: faUserGraduate
          },
        ];
        break;
      case Roles.Trainer:
        this.navItems = [
          {
            name: 'Dashboard',
            route: '/dashboard',
            // faIcon: faChartLine
          },
          {
            name: 'Leave management',
            route: '/leave-management',
            // faIcon: faPersonWalkingArrowRight
          },
          {
            name: 'IKM management',
            route: '/ikm-management',
            // faIcon: faUserGraduate
          },
        ];
        break;
      case Roles.Learner:
        this.navItems = [
          {
            name: 'Dashboard',
            route: '/dashboard',
            // faIcon: faChartLine
          },
          {
            name: 'Leave',
            route: '/leave-management',
            // faIcon: faPersonWalkingArrowRight
          },
          {
            name: 'IKM',
            route: '/ikm-management',
            // faIcon: faUserGraduate
          },
        ];
        break;
    }
  }

  openLMSinNewTab(url: string){
    window.open(url, "_blank");
  }

  openDialog(user?: any) {
    this.modalDialog = this.modalService.open(EnrolComponent, {
      animation: true,
      backdrop: true,
      containerClass: 'right',
      data: { user: user },
      ignoreBackdropClick: false,
      keyboard: true,
      modalClass: 'modal-xl modal-dialog-centered',
    });

    this.modalDialog.onClose.subscribe(() => {});
  }

  logout() {
    //clear the sessionStorage and reload
    sessionStorage.clear();
    window.location.reload();
  }
}

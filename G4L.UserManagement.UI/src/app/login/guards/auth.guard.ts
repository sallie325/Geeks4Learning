import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private tokenService: TokenService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree  {

    const account = this.authenticationService.authenticateResponse;

    // if the account is empty/undefined then route to login
    if (!account) return this.router.parseUrl('/login');

    // check if the token is expired
    if (this.tokenService.isTokenExpired()) {
      // redirect to login
      // clear the page
      sessionStorage.clear();
      this.router.navigate(['/']);
      return false;
    } else {
      // check if route is restricted by role
      if (
        route.data['roles'] &&
        route.data['roles'].indexOf(account.role) === -1
      ) {
        // role not authorised so redirect to home page
        this.router.navigate(['/']);
        return false;
      }

      // authorised so return true
      return true;
    }
  }
  
}

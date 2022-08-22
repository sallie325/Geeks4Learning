import { Injectable } from '@angular/core';
import  jwt_decode  from 'jwt-decode';
import { AuthenticationService } from './authentication.service';
import { CookieService } from './cookie.service';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  jwtToken: string | undefined;
  decodedToken: any | undefined;

  constructor(private authenticationService: AuthenticationService) {
    this.setToken();
  }

  setToken() {
    this.jwtToken = this.authenticationService.authenticateResponse?.token;
  }

  decodeToken() {
    if (this.jwtToken) this.decodedToken = jwt_decode(this.jwtToken);
  }

  getDecodeToken() {
    if (this.jwtToken) return jwt_decode(this.jwtToken);
  }

  getExpiryTime() {
    this.decodeToken();
    return this.decodedToken ? this.decodedToken.exp : null;
  }

  isTokenExpired(): boolean {
    const expiryTime: number = this.getExpiryTime();
    if (expiryTime) {
      return 1000 * expiryTime - new Date().getTime() < 5000;
    } else {
      return true;
    }
  }
}

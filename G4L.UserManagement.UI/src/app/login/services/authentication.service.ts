import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticateRequest } from '../models/authenticate-request.model';
import { AuthenticateResponse } from '../models/authenticate-response.model';
import { ApiService } from '../../shared/api.service';
import { constants } from 'src/app/shared/global.constants';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  path: string = 'User';
  authenticateResponse: AuthenticateResponse | undefined;

  constructor(private apiService: ApiService) {
    this.getAuthenticateResponse();
  }

  authenticate(authenticateRequest: AuthenticateRequest): void {
    this.apiService.post(`${this.path}/login`, authenticateRequest)
      .subscribe((response: AuthenticateResponse) => {
        this.authenticateResponse = response;
        sessionStorage.setItem(constants.info, JSON.stringify(this.authenticateResponse));
      }
    );
  }

  getAuthenticateResponse(): any {
    // check for the authenticateResponse in the sessionStorage
    const storageResult = sessionStorage.getItem(constants.info);

    if (storageResult) {
      this.authenticateResponse = JSON.parse(storageResult);
    }
  }

  logout() {
    sessionStorage.clear();
    window.location.reload();
  }

}

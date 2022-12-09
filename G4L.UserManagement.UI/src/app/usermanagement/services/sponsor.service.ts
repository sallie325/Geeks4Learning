import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SponsorService {

  constructor(private http: HttpClient) { }

  getSponsors(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/sponsor`);
  }

  getSponsorById(sponsorId: any): Observable<any> {
    return this.http.get(`${environment.apiUrl}/sponsor/${sponsorId}`);
  }

  getApproversBySponsor(sponsorId: any): Observable<any> {
    return this.http.get(`${environment.apiUrl}/sponsor/${sponsorId}/approvers`);
  }

  getSponsorByUserId(userId: any): Observable<any> {
    return this.http.get(`${environment.apiUrl}/sponsor/approvers/${userId}`);
  }

}

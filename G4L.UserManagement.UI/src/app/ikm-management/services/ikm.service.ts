import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IkmService {

  constructor(private http: HttpClient) {

  }

  getIKMResults(startDate: any, endDate: any, status: any): Observable<any> {
    return this.http.get(`${environment.apiUrl}/ikm?startDate=${startDate}&endDate=${endDate}&status=${status}`);
  }

}

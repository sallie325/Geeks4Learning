import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  authenticate(value: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/user/login`, value);
  }

  getAllUsers(): Observable<any>  {
    return this.http.get(`${environment.apiUrl}/user`);
  }

  addUser(path: string, body: any): Observable<any>  {
    return this.http.post(`${environment.apiUrl}/user`, body);
  }

}

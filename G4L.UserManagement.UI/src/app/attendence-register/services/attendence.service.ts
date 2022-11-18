import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AttendenceService {
  getPagedAttendance(skip: any, take: any) {
    return this.http.get(`${environment.apiUrl}/Attendance/attendance_pages?skip=${skip}&take=${take}`);
  }
  UpdateAttendance(logoutTime: any): Observable<any> {
    return this.http.put(`${environment.apiUrl}/Attendance/updateAttendance`, logoutTime);
  }

  UpdateGoals(Goals: any): Observable<any> {
    return this.http.put(`${environment.apiUrl}/Attendance/updateAttendance`, Goals);
  }
  constructor(private http: HttpClient) { }

  getAttendences(value:any) {
    return this.http.get(`${environment.apiUrl}/Attendance/${value}`);
  }
  captureDetails(value: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/Attendance/attendanceRegister`, value)
  }


}

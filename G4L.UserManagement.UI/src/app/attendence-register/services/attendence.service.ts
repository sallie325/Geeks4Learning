import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { contants } from 'src/app/shared/global/global.contants';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AttendenceService {

  attendance = new BehaviorSubject<any>(undefined);

  constructor(private http: HttpClient) { }

  saveAttendence(attendance: any) {
    return this.http.post(`${environment.apiUrl}/attendance/`, attendance);
  }

  updateAttendanceGoals(value: any) {
    return this.http.put(`${environment.apiUrl}/attendance/updateAttendanceGoals`,value);
  }

  getPagedAttendance(skip: any, take: any) {
    return this.http.get(`${environment.apiUrl}/attendance/attendance_pages?skip=${skip}&take=${take}`);
  }

  updateAttendance(logoutTime: any): Observable<any> {
    return this.http.put(`${environment.apiUrl}/attendance/updateAttendance`, logoutTime);
  }

  getAttendences(value:any) {
    return this.http.get(`${environment.apiUrl}/attendance/${value}`);
  }

  captureDetails(value: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/attendance/attendanceRegister`, value)
  }

  saveToLocalStorage(attendance: any) {
    localStorage.setItem(contants.attendance, JSON.stringify(attendance));
    this.attendance.next(attendance);
  }

  getFromLocalStorage() {
    const attendance = localStorage.getItem(contants.attendance);
    this.attendance.next(attendance ? JSON.parse(attendance) : []);
  }
}

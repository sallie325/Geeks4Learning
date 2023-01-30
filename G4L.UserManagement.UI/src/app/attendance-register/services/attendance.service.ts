import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from 'src/app/shared/app-config/app-config.interface';
import { APP_SERVICE_CONFIG } from 'src/app/shared/app-config/app-config.service';

@Injectable({
  providedIn: 'root',
})
export class AttendanceService {
  constructor(
    @Inject(APP_SERVICE_CONFIG) private config: AppConfig,
    private http: HttpClient
  ) {}

  updateAttendanceGoals(value: any) {
    return this.http.put(
      `${this.config.apiUrl}/Attendance/updateAttendanceGoals`,
      value
    );
  }
  getPagedAttendance(skip: any, take: any) {
    return this.http.get(
      `${this.config.apiUrl}/Attendance/attendance_pages?skip=${skip}&take=${take}`
    );
  }
  updateAttendance(logoutTime: any): Observable<any> {
    return this.http.put(
      `${this.config.apiUrl}/Attendance/updateAttendance`,
      logoutTime
    );
  }

  getAttendances(value: any) {
    return this.http.get(`${this.config.apiUrl}/Attendance/${value}`);
  }
  captureDetails(value: any): Observable<any> {
    return this.http.post(
      `${this.config.apiUrl}/Attendance/attendanceRegister`,
      value
    );
  }
}

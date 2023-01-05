import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AsyncSubject, BehaviorSubject } from 'rxjs';
import { contants } from 'src/app/shared/global/global.contants';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  holidays = new BehaviorSubject<any[]>([]);

  constructor(private http: HttpClient) {
    const holidays = localStorage.getItem(contants.holidays);
    this.holidays.next(holidays ? JSON.parse(holidays) : []);
  }

  getCalendarEvents(calendarId: any) {
    this.http.get(`${environment.apiUrl}/googleCalendar/${calendarId}`)
      .subscribe((holidays: any) => {
        localStorage.setItem(contants.holidays, JSON.stringify(holidays));
        this.holidays.next(holidays);
      }
      );
  }

}

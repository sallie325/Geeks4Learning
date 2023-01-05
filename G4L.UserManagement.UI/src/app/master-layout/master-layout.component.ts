import { Component, OnInit } from '@angular/core';
import { EventService } from '../leave-management/services/event.service';

@Component({
  selector: 'app-master-layout',
  templateUrl: './master-layout.component.html',
  styleUrls: ['./master-layout.component.css']
})
export class MasterLayoutComponent implements OnInit {

  constructor(private eventService: EventService) {
  }

  ngOnInit(): void {
    this.getPublicHoildays("en%2Esa%23holiday%40group%2Ev%2Ecalendar%2Egoogle%2Ecom");
  }

  getPublicHoildays(calendarId: string) {
    this.eventService.getCalendarEvents(calendarId);
  }

}

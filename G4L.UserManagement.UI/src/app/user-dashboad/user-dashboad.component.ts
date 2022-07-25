import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import { ApiService } from 'src/app/shared/api.service'

@Component({
  selector: 'app-user-dashboad',
  templateUrl: './user-dashboad.component.html',
  styleUrls: ['./user-dashboad.component.css']
})
export class UserDashboadComponent implements OnInit {

   heading = "user-dashboad works!";
   userList$!:Observable<any[]>; 
   userTypesList:any=[];

   //Map to display data associate with foreign keys
   userTypesMap:Map<number, string> = new Map();

  constructor(private service:ApiService) { }

  ngOnInit(): void {
    this.userList$ = this.service.getAllUsers();
  }

  
    
   getCareer(x: number): string {
    switch (x) {
      case 0:
          return "Business Analyst";

      case 1:
         return "Software Testing";

      case 2:
         return "Systems Support";

      case 3:
        return "C# Full Stack Developer";

      case 4:
         return "Java Full Stack Developer";
        default:
          return " No Career";

    }
    
  }

  

}

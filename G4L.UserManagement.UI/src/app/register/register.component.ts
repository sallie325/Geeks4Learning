import { Component, OnInit } from '@angular/core';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from '../shared/api.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  heading = "register works!"; 
  faAngle= faAngleRight;
  
  constructor(public service: ApiService) { }

  ngOnInit(): void {
  }
  onSubmit()
  {
    this.service.register().subscribe( data => { 
      console.log(data);
    });
    
  }

}

import { HttpErrorResponse } from '@angular/common/http';
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
    var data = this.service.register();
    console.log(data);
    this.service.addUser(data).subscribe({
      next: (_) => console.log("Successful registration"),
      error: (err) => console.log(err.error.errors)
    }); 
 
    
  }

}

import { Component, OnInit } from '@angular/core';
import { faCircleNodes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  heading = "login works!";
  faCicle = faCircleNodes ;
  title = "Geeks for learning "
  constructor() { }

  ngOnInit(): void {
  }

}

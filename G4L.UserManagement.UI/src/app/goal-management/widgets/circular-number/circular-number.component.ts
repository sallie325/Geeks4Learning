import { Component, Input, OnInit } from '@angular/core';
import { goalTypes } from '../../models/goal-model';

@Component({
  selector: 'app-circular-number',
  templateUrl: './circular-number.component.html',
  styleUrls: ['./circular-number.component.css']
})
export class CircularNumberComponent implements OnInit {
  @Input()
  goalCount!: number;

  @Input()
  activeClass!: goalTypes;

  constructor() { }

  ngOnInit(): void {
  }

}

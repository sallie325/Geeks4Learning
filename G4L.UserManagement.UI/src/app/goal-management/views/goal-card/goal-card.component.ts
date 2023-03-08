import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-goal-card',
  templateUrl: './goal-card.component.html',
  styleUrls: ['./goal-card.component.css']
})
export class GoalCardComponent implements OnInit {

  @Input()
  goalTitle!: string;
  
  @Input()
  goalDescription!: string;
  
  @Input()
  goalDuration!: string;

  constructor() { }

  ngOnInit(): void {
  }

}

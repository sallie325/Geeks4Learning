import { Component, Input, OnInit } from '@angular/core';
import { GoalModel } from '../../models/goal-model';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  @Input() goal!: GoalModel;

  constructor() {}

  ngOnInit(): void {}
}

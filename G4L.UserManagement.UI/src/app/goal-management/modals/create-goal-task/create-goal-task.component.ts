import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-create-goal-task',
  templateUrl: './create-goal-task.component.html',
  styleUrls: ['./create-goal-task.component.css']
})
export class CreateGoalTaskComponent implements OnInit, AfterViewInit {
  public newTask!: string
  constructor(private taskModalRef: MdbModalRef<CreateGoalTaskComponent>) { }

  @ViewChild('newTask', { static: true })
  newTaskElement!: ElementRef

  ngOnInit(): void {
  }

  ngAfterViewInit(): void { }

  addNewTask() {
    this.closeModal(this.newTaskElement.nativeElement.value);
  }

  closeModal(task?: string) {
    this.taskModalRef.close(task)
  }
}

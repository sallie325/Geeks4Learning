import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject } from 'rxjs';
import { GoalModel } from '../models/goal-model';

@Injectable({
  providedIn: 'root',
})
export class GoalManagementService {
  private goalSubject!: Subject<GoalModel>;
  private fakeServer: string = 'http://localhost:3000';

  constructor(private http: HttpClient, private toastrService: ToastrService) {
    this.goalSubject = new Subject<GoalModel>();
  }

  emitGoal(goal: GoalModel): void {
    this.getGoalSubject().next(goal);
  }

  insertNewGoal(goal: GoalModel): void {
    console.log("I am insertNewGoal :" +goal)
    this.http.post<GoalModel>(`https://localhost:44326/api/GoalsManagement/AddGoal`, goal)
      .subscribe(newGoal => {
        this.emitGoal(newGoal)
      })
  }

  updateGoal(goal: GoalModel): Observable<GoalModel> {
    return this.http.put<GoalModel>(`${this.fakeServer}/goals/${goal?.id}`, goal);
  }

  onGoalEmit(): Subject<GoalModel> {
    this.http.get<GoalModel[]>(`${this.fakeServer}/goals`).subscribe(
      (goals: GoalModel[]) => {
        goals.forEach((goal: GoalModel) => {
          this.emitGoal(goal)
        });
      }
    );

    return this.getGoalSubject();
  }

  getGoalById(id: any): Observable<GoalModel> {
    return this.http.get<GoalModel>(`${this.fakeServer}/goals/${id}`);
  }

  showErrorMessage(messageTitle: string, message: string) {
    this.toastrService.error(message, messageTitle);
  }

  getGoalSubject(): Subject<GoalModel> {
    return this.goalSubject;
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject } from 'rxjs';
import { GoalModel } from '../models/goal-model';

@Injectable({
  providedIn: 'root',
})
export class GoalManagementService {
  private goalSubject!: Subject<GoalModel>
  private localServerAddress: string = "http://localhost:58760"

  constructor(
    private http: HttpClient,
    private toastrService: ToastrService,) {
    this.goalSubject = new Subject<GoalModel>();
  }

  saveGoal(goal: GoalModel): Observable<GoalModel> {
    return this.http.post<GoalModel>(`${this.localServerAddress}/goals`, goal);
  }

  updateTime(goal: GoalModel): Observable<GoalModel> {
    return this.http.put<GoalModel>(`${this.localServerAddress}/goals`, goal);
  }

  getGoals(): Subject<GoalModel> {
    this.http.get<GoalModel[]>(`${this.localServerAddress}/api/goals`)
      .subscribe(
        (goals: GoalModel[]) => {
          goals.forEach((goal: GoalModel) => {
            this.goalSubject.next(goal);
          })
        },
        (err) => {
        this.showErrorMeesage("Loading Goals", err.message);
      })
    
    return this.getGoalSubject();
  }

  showErrorMeesage(messageTitle: string, message: string) {
    this.toastrService.error(message, messageTitle)
  }

  getGoalSubject(): Subject<GoalModel> {
    return this.goalSubject;
  }
}

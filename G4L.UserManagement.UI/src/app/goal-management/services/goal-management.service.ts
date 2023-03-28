import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject } from 'rxjs';
import { TokenService } from 'src/app/user-management/login/services/token.service';
import { environment } from 'src/environments/environment';
import { GoalModel } from '../models/goal-model';

@Injectable({
  providedIn: 'root',
})
export class GoalManagementService {
  private goalSubject!: Subject<GoalModel>;

  constructor(
    private http: HttpClient,
    private toastrService: ToastrService,
    private tokenService: TokenService
  ) {
    this.goalSubject = new Subject<GoalModel>();
  }

  emitGoal(goal: GoalModel): void {
    this.getGoalSubject().next(goal);
  }

  insertNewGoal(goal: GoalModel): void {
    const user = this.tokenService.getDecodeToken();
    goal.userId = user.id;

    this.http.post<GoalModel>(`${environment.mockServer}/goals`, goal)
      .subscribe(newGoal => {
        this.emitGoal(newGoal)
      })
  }

  updateGoal(goal: GoalModel): Observable<GoalModel> {
    return this.http.put<GoalModel>(`${environment.mockServer}/goals/${goal?.id}`, goal);
  }

  onGoalEmit(): Subject<GoalModel> {
    this.http.get<GoalModel[]>(`${environment.mockServer}/goals`).subscribe(
      (goals: GoalModel[]) => {
        goals.forEach((goal: GoalModel) => {
          this.emitGoal(goal)
        });
      }
    );

    return this.getGoalSubject();
  }

  getGoalById(id: any): Observable<GoalModel> {
    return this.http.get<GoalModel>(`${environment.mockServer}/goals/${id}`);
  }

  showErrorMessage(messageTitle: string, message: string): void {
    this.toastrService.error(message, messageTitle);
  }

  getGoalSubject(): Subject<GoalModel> {
    return this.goalSubject;
  }
}

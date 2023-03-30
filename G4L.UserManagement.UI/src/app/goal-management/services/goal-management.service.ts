import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject } from 'rxjs';
import { AppConfig } from '../../shared/app-config/app-config.interface';
import { APP_SERVICE_CONFIG } from '../../shared/app-config/app-config.service';
import { GoalModel } from '../models/goal-model';

@Injectable({
  providedIn: 'root',
})
export class GoalManagementService {
  private goalSubject!: Subject<GoalModel>;
  private fakeServer: string = 'http://localhost:3000';

  constructor(
    private http: HttpClient,
    private toastrService: ToastrService,
    @Inject(APP_SERVICE_CONFIG) private config: AppConfig
  ) {
    this.goalSubject = new Subject<GoalModel>();
  }

  emitGoal(goal: GoalModel): void {
    this.getGoalSubject().next(goal);
  }

  insertNewGoal(goal: GoalModel): void {
    console.log(JSON.stringify(goal));
    this.http
      .post<GoalModel>(`${this.config.apiUrl}/goal/addGoal`, goal)
      .subscribe((newGoal) => {
        console.log('I am new goal');
        console.log(newGoal);
        this.emitGoal(newGoal);
      });
  }

  updateGoal(goal: GoalModel): Observable<GoalModel> {
    return this.http.put<GoalModel>(
      `${this.fakeServer}/goals/${goal?.id}`,
      goal
    );
  }

  onGoalEmit(): Subject<GoalModel> {
    this.http
      .get<GoalModel[]>(`${this.fakeServer}/goals`)
      .subscribe((goals: GoalModel[]) => {
        goals.forEach((goal: GoalModel) => {
          this.emitGoal(goal);
        });
      });

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

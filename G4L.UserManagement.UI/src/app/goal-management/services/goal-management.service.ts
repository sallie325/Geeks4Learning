import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GoalModel } from '../models/goal-model';

@Injectable({
  providedIn: 'root',
})
export class GoalManagementService {
  constructor(private http: HttpClient) {}

  saveGoal(goal: GoalModel): Observable<GoalModel> {
    return this.http.post<GoalModel>(`http://localhost:3000/goals`, goal);
  }
  updateTime(goal: GoalModel): Observable<GoalModel> {
    return this.http.put<GoalModel>(`http://localhost:3000/goals`, goal);
  }
  getGoals(): Observable<GoalModel[]> {
    return this.http.get<GoalModel[]>(`http://localhost:3000/goals`);
  }
}

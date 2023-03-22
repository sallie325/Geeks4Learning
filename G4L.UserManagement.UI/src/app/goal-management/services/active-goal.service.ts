import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, Observable, Subscription } from 'rxjs';
import { activeGoalPopupWindowState } from '../models/active-goal-model';
import { GoalModel } from '../models/goal-model';

@Injectable({
  providedIn: 'root'
})
export class ActiveGoalService {
  popupGoalWindowState: activeGoalPopupWindowState = "close";
  currentGoal!: GoalModel
  timeRemaining!: string
  countDownTimer!: BehaviorSubject<string>
  $intervalStream: Subscription | null = null

  constructor() {
    this.countDownTimer = new BehaviorSubject<string>("00:00:00");
  }

  setActiveGoal(activatingGoal: GoalModel): void {
    this.popupGoalWindowState = "open"
    this.currentGoal = activatingGoal;
  }

  deactivateGoal(): void {
    if (this.$intervalStream) this.$intervalStream.unsubscribe();
    this.popupGoalWindowState = "close"
  }

  getActiveGoalPopupWindowState(): activeGoalPopupWindowState {
    return this.popupGoalWindowState;
  }

  getActiveGoalObject() {
    return this.currentGoal;
  }

  getIntegerFromString(timepart: string): number {
    return parseInt(timepart);
  }

  getGoalDuration(timesplit: Array<string>): Date {
    const startDateTime = new Date();
    const [hours, minutes, seconds] = timesplit

    // Setting the endtime for the goal from the current timestamp!
    const endDateTime = new Date();
    endDateTime.setHours(endDateTime.getHours() + this.getIntegerFromString(hours))
    endDateTime.setMinutes(endDateTime.getMinutes() + this.getIntegerFromString(minutes))
    endDateTime.setSeconds(endDateTime.getSeconds() + this.getIntegerFromString(seconds))

    const goalDuration = new Date(endDateTime)
    // Setting up the goal duration time from the current time!
    goalDuration.setHours(goalDuration.getHours() - startDateTime.getHours())
    goalDuration.setMinutes(goalDuration.getMinutes() - startDateTime.getMinutes())
    goalDuration.setSeconds(goalDuration.getSeconds() - startDateTime.getSeconds())

    return goalDuration;
  }

  activateGoalCountDown(goal: GoalModel): void {
    this.setActiveGoal(goal);

    // console.log(startDateTime, endDateTime)
    const goalDuration = this.getGoalDuration(this.currentGoal.duration.split(":"));

    this.$intervalStream = interval(1000).subscribe(() => {
      if (goalDuration.getHours() === 0 && goalDuration.getMinutes() === 0 && goalDuration.getSeconds() === 0) {
        this.deactivateGoal();
        // Open the ADD EXTRA TIME DIALOG!!
        alert("ADD EXTRA TIME DIALOG MUST APPEAR HERE!!!!!!!")
        return;
      }
      
      goalDuration.setSeconds(goalDuration.getSeconds() - 1)
      goal.duration = this.getTimeFormated(goalDuration);
      this.countDownTimer.next(goal.duration)
    })
  }

  getTimeFormated(dateObject: Date): string {
    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();
    const seconds = dateObject.getSeconds();

    return `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`
  }

  getCountDownTimer(): Observable<string> {
    return this.countDownTimer!;
  }
}

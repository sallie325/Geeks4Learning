import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, Observable, Subscription } from 'rxjs';
import { activeGoalPopupWindowState, GoalModel } from '../../models/goal-model';
import { ViewGoalService } from './view-goal.service';

@Injectable({
  providedIn: 'root'
})
export class ActiveGoalService {
  popupGoalWindowState: activeGoalPopupWindowState = "close";
  currentGoal!: GoalModel
  timeRemaining!: string
  countDownTimer!: BehaviorSubject<string>
  $intervalStream: Subscription | null = null

  constructor(private viewGoalService: ViewGoalService) {
    this.countDownTimer = new BehaviorSubject<string>("00:00:00");
  }

  setActiveGoal(activatingGoal: GoalModel): void {
    this.popupGoalWindowState = "open"
    this.currentGoal = activatingGoal;
  }

  deactivateCurrentActiveGoal(): void {
    if (this.$intervalStream) this.$intervalStream.unsubscribe();
    if (this.popupGoalWindowState = "open") this.popupGoalWindowState = "close"
    if (sessionStorage.getItem('activeGoalSession')) sessionStorage.removeItem('activeGoalSession')
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
    // Check if active goal is running and deactivate before creating a new interval instance
    this.deactivateCurrentActiveGoal();

    // Set the new goal instance
    this.setActiveGoal(goal);

    // console.log(startDateTime, endDateTime)
    const goalDuration = this.getGoalDuration(this.currentGoal.timeRemaining.split(":"));

    this.$intervalStream = interval(1000).subscribe(() => {
      if (goalDuration.getHours() === 0
        && goalDuration.getMinutes() === 0
        && goalDuration.getSeconds() === 0) {
        this.deactivateCurrentActiveGoal();
        // Open the ADD EXTRA TIME DIALOG!!
        this.viewGoalService.viewSelectedGoal(this.getActiveGoalObject(), true)
        return;
      }

      goalDuration.setSeconds(goalDuration.getSeconds() - 1)
      goal.timeRemaining = this.getTimeFormated(goalDuration);
      
      // Emit the current remaining time
      this.countDownTimer.next(goal.timeRemaining)

      // Create a Memento for the current timestamp
      sessionStorage.setItem("activeGoalSession", JSON.stringify({
        id: goal.id,
        timeLeft: goal.timeRemaining
      }))
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

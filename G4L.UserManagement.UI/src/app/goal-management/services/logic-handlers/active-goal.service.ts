import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, Observable, Subscription } from 'rxjs';
import { activeGoalPopupWindowState, GoalModel } from '../../models/goal-model';
import { GoalManagementService } from '../api/goal-management.service';
import { ViewGoalService } from './view-goal.service';
import { getSessionStorageValue, getTimeFormated, removeSessionStoragePair, setSessionStoragePairs } from 'src/app/shared/utils/utils';

@Injectable({
  providedIn: 'root'
})
export class ActiveGoalService {
  popupGoalWindowState: activeGoalPopupWindowState = "close";
  currentGoal!: GoalModel
  timeRemaining!: string
  countDownTimerBehaviourSubject!: BehaviorSubject<string>
  $intervalStream: Subscription | null = null

  constructor(
    private viewGoalService: ViewGoalService,
    private goalManagementApiService: GoalManagementService
  ) {
    this.countDownTimerBehaviourSubject = new BehaviorSubject<string>("00:00:00");
  }

  setActiveGoal(activatingGoal: GoalModel): void {
    this.popupGoalWindowState = "open"
    this.currentGoal = activatingGoal;
  }

  deactivateCurrentActiveGoal(clearSession: boolean = true): void {
    if (this.$intervalStream) this.$intervalStream.unsubscribe();
    if (this.popupGoalWindowState = "open") this.popupGoalWindowState = "close"

    if (clearSession) {
      if (getSessionStorageValue('activeGoalSession')) removeSessionStoragePair('activeGoalSession')
      if (getSessionStorageValue('warningShown')) removeSessionStoragePair('warningShown')
    }
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
    this.deactivateCurrentActiveGoal(false);

    // Set the new goal instance
    this.setActiveGoal(goal);

    // console.log(startDateTime, endDateTime)
    const goalDuration = this.getGoalDuration(this.currentGoal.timeRemaining.split(":"));

    this.$intervalStream = interval(1000).subscribe(() => {
      if (goalDuration.getHours() === 0
        && goalDuration.getMinutes() === 0
        && goalDuration.getSeconds() === 0) {
        this.goalManagementApiService.updateGoal(goal).subscribe((updatedGoal: GoalModel) => {
          goal = updatedGoal;

          this.deactivateCurrentActiveGoal(false);
          // Open the ADD EXTRA TIME DIALOG!!
          this.viewGoalService.viewSelectedGoal(this.getActiveGoalObject(), true)
        })
        return;
      }

      goalDuration.setSeconds(goalDuration.getSeconds() - 1)
      goal.timeRemaining = getTimeFormated(goalDuration);

      // Emit the current remaining time
      this.countDownTimerBehaviourSubject.next(goal.timeRemaining)

      // Create a Memento for the current timestamp
      setSessionStoragePairs("activeGoalSession", JSON.stringify({
        id: goal.id,
        timeRemaining: goal.timeRemaining
      }))
    })
  }

  getCountDownTimerBehaviourSubject(): Observable<string> {
    return this.countDownTimerBehaviourSubject!;
  }
}


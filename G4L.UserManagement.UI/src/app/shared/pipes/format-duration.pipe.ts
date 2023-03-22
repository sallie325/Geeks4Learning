import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDuration'
})
export class FormatDurationPipe implements PipeTransform {
  getIntegerFromString(timepart: string): number {
    return parseInt(timepart);
  }

  getTimeFormat(timesplit: Array<string>): string {
    const [hours, minutes] = timesplit

    if(this.getIntegerFromString(minutes) === 0) return `${this.getIntegerFromString(hours)} hr`
    if(this.getIntegerFromString(hours) === 0) return `${this.getIntegerFromString(minutes)} min`
    return `${this.getIntegerFromString(hours)} hr ${this.getIntegerFromString(minutes)} min`
  }

  transform(value: string, ...args: unknown[]): unknown {
    const [goalState, isGoalStarted] = args

    return (goalState === "started" && isGoalStarted === "open") ? value : this.getTimeFormat(value.split(':'));
  }
}

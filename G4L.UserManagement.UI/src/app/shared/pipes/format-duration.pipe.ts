import { Pipe, PipeTransform } from '@angular/core';
import { getIntegerFromString } from '../utils/timeFormatting';

@Pipe({
  name: 'formatDuration'
})
export class FormatDurationPipe implements PipeTransform {
  getTimeFormat(timesplit: Array<string>): string {
    const [hours, minutes, seconds] = timesplit

    let timerFormat = ``

    if (getIntegerFromString(hours) > 0) {
      timerFormat += `${getIntegerFromString(hours)} hr `

      if (getIntegerFromString(minutes) > 0) {
        timerFormat += `${getIntegerFromString(minutes)} min `

        if (getIntegerFromString(seconds) > 0) {
          timerFormat += `${getIntegerFromString(seconds)} sec`
        }
      }
    }
    else if (getIntegerFromString(minutes) > 0) {
      timerFormat = `${getIntegerFromString(minutes)} min `

      if (getIntegerFromString(seconds) > 0) {
        timerFormat += `${getIntegerFromString(seconds)} sec`
      }
    }
    else if (getIntegerFromString(seconds) > 0) {
      timerFormat = `${getIntegerFromString(seconds)} sec `
    }

    return timerFormat;
  }

  transform(value: string, ...args: unknown[]): unknown {
    const [type] = args
    return this.getTimeFormat(value.split(':'));
  }
}

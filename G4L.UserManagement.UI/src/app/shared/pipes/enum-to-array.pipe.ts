import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'enumToArray'
})
export class EnumToArrayPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    let keys = [];
    for (var enumMember in value)
    {
      var isValueProperty = parseInt(enumMember, 10) >= 0;
      if (isValueProperty)
      {
        keys.push({ key: enumMember, value: value[enumMember] });
      }
    }
    return keys;
  }

}

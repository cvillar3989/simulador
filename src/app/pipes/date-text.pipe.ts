import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateText'
})
export class DateTextPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return null;
  }

}

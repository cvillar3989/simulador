import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hideCenterAccount'
})
export class HideCenterAccountPipe implements PipeTransform {

  transform(value: string, ...args: any[]): any {
    return `${value.substr(0, 8)}************${value.substr(8+12)}` ;
  }

}

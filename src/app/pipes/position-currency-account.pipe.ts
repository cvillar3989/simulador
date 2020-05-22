import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'positionCurrencyAccount'
})
export class PositionCurrencyAccountPipe implements PipeTransform {
  transform(value: string, ...args: any[]): any {
    return `${value.substr(1)}`+' ' +`${value.substr(0,1)}` ;
}

}
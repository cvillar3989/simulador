import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'positionCurrencyAccount'
})
export class PositionCurrencyAccountPipe implements PipeTransform {
  transform(value: string, ...args: any[]): any {
    return Intl.NumberFormat("es-ES", {minimumFractionDigits: 2}).format(Number(value.replace(",","").replace(value.substr(0,1),"")))+value.substr(0,1);
}

}
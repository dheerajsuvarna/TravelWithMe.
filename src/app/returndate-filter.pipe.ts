import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'returndateFilter'
})
export class ReturndateFilterPipe implements PipeTransform {

  transform(value: any, date: any,isFlexible: any, upperLimit: any,lowerlimit: any): any {
    if (date === undefined || date === null) {
      return value;
    }
    if (isFlexible ) {
      return value.filter((item) => {
        if (item.endDate === date) {
          return item;
        } else if (item.endDate === upperLimit) {
          return item;
        } else if (item.endDate === lowerlimit) {
          return item;
        }
      });
    }
    return value.filter((item) => item.endDate.includes(date));
  }

}

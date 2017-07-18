import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'traveldateFilter'
})
export class TraveldateFilterPipe implements PipeTransform {

  transform(value: any, date: Date, isFlexible: any, upperLimit: any): any {
    if (date === undefined || date === null ) {
      return value;
    }
    if (isFlexible ) {
      return value.filter((item) => {
        if (item.startDate === date) {
          return item;
        } else if (item.startDate === upperLimit) {
          return item;
        }
      });
    }
    return value.filter((item) => item.startDate.includes(date));
  }

}

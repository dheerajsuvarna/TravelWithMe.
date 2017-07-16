import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'traveldateFilter'
})
export class TraveldateFilterPipe implements PipeTransform {

  transform(value: any, date: any, isFlexible: any): any {
    if (date === undefined || date === null) {
      return value;
    }
    if(isFlexible ){
    }
    return value.filter((item) => item.startDate.includes(date));
  }

}

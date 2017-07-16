import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'traveldateFilter'
})
export class TraveldateFilterPipe implements PipeTransform {

  transform(value: any, date: Date, isFlexible: any): any {
    if (date === undefined || date === null) {
      return value;
    }
    if(isFlexible ){
      console.log("Flexible Date");
      console.log(date);
      return value.filter((item) => item.startDate.includes(date));
    }
    return value.filter((item) => item.startDate.includes(date));
  }

}

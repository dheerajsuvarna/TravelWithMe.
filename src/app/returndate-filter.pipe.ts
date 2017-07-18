import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'returndateFilter'
})
export class ReturndateFilterPipe implements PipeTransform {

  transform(value: any, date: any,isFlexible: any, upperLimit: any): any {
    if (date === undefined || date === null) {
      return value;
    }
    if (isFlexible){
      return value.filter((item) => {
        if ((item.endDate >= date) && (item.endDate <= upperLimit)) {
          return item;
        }
      });
    }
    return value.filter((item) => item.endDate.includes(date));
  }

}

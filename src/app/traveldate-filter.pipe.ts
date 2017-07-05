import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'traveldateFilter'
})
export class TraveldateFilterPipe implements PipeTransform {

  transform(value: any, date: any): any {
    if (date === undefined || date === null) {
      console.log("in travel date function")
      return value;
    }
    console.log("In Travel Date function part 2");
    console.log(value);
    console.log(date);
    return value.filter((item) => item.date.includes(date));
  }

}

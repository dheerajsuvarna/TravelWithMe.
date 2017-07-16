import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noofpeopleFilter'
})
export class NoofpeopleFilterPipe implements PipeTransform {

  transform(value: any, noofpeople: any): any {
    if (noofpeople === undefined || noofpeople === null) {
      return value;
    }
    return value.filter((item) => {
        if (item.noofpeople < noofpeople) {
          return item;
        }
      }
    );
  }

}

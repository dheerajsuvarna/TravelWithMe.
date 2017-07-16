import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noofpeopleFilter'
})
export class NoofpeopleFilterPipe implements PipeTransform {

  transform(value: any, noofpeople: any, isFlexible: any): any {
    if (noofpeople === undefined || noofpeople === null) {
      return value;
    }
    if (isFlexible){
      return value.filter((item) => {
          if (item.noofpeople < (noofpeople * 1.5)) {
            return item;
          }
        }
      );
    }
    return value.filter((item) => {
        if (item.noofpeople < noofpeople) {
          return item;
        }
      }
    );
  }

}

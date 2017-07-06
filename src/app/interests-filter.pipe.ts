import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'interestsFilter'
})
export class InterestsFilterPipe implements PipeTransform {

  transform(value: any, interests: any): any {
    if (interests === undefined || interests === null) {
      return value;
    }
    return value.filter((item) => item.interests.toLowerCase().includes(interests));
  }

}

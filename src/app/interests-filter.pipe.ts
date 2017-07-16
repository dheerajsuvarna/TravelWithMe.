import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'interestsFilter'
})
export class InterestsFilterPipe implements PipeTransform {

  transform(value: any, interests: any): any {
    if (interests === undefined || interests === null) {
      return value;
    }
    console.log("inside interests filter");
    console.log(interests);
    console.log(value);
    return value.filter((item) => item.interests.includes(interests));
  }

}

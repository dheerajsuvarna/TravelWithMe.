import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'traveldateFilter'
})
export class TraveldateFilterPipe implements PipeTransform {

  transform(value: any): any {
    console.log("In Travel Date function");
    console.log(value);
    return value;
  }

}

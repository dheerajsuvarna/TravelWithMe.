import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'returndateFilter'
})
export class ReturndateFilterPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}

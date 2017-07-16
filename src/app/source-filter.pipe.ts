import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sourceFilter'
})
export class SourceFilterPipe implements PipeTransform {

  transform(value: any, source: any): any {
    if (source === undefined || source === null) {
      return value;
    }
    console.log(value);
    return value.filter((item) => item.source.toLowerCase().includes(source));
  }
}

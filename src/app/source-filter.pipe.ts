import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sourceFilter'
})
export class SourceFilterPipe implements PipeTransform {

  transform(value: any, source: any): any {
    if (source === undefined || source === null) {
      console.log("in source - undefined")
      return value;
    }
    console.log("in source");
    console.log(source);
    console.log(value);
    return value.filter((item) => item.source.toLowerCase().includes(source));
  }
}

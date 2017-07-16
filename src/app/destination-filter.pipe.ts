import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'destinationFilter'
})
export class DestinationFilterPipe implements PipeTransform {
  transform(value: any, destination: any): any {
    if (destination === undefined || destination === null) {
      return value;
    }
    return value.filter((item) => item.destination.toLowerCase().includes(destination));
  }

}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'destinationFilter'
})
export class DestinationFilterPipe implements PipeTransform {
  transform(value: any, destination: any): any {
    if (destination === undefined || destination === null) {
      console.log("in destination - undefined or null")
      return value;
    }
    console.log("in destination");
    console.log(destination);
    console.log(value);
    return value.filter((item) => item.destination.toLowerCase().includes(destination));
  }

}

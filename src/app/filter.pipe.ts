import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(trips: any, value: any): any {
    // Check if search term is undefined
    if (value === undefined) {
      return trips;
    }
    // return updated Trips
    return trips.filer(function(trip){
      return trip.destination.toLowerCase().includes(value.toLowerCase());
      }

    )
  }

}

/**
 * Created by dheeraj on 02-07-2017.
 */
import { Pipe, PipeTransform } from '@angular/core';
import {isNullOrUndefined} from "util";

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  transform(value, source: any, destination: any) {
    /*if (( source === undefined) && (destination === undefined)) {
      console.log("both are undefined");
      console.log(source);
      console.log(destination);
      return value;
    } else if (source === null) {
      console.log(source);
      console.log(destination);
      console.log("source is not undefined");
      return value.filter((item) => item.destination.toLowerCase().includes(destination));
    } else if (destination === null) {
      console.log(source);
      console.log(destination);
      console.log("destination is not undefined");
      return value.filter((item) => item.sources.toLowerCase().includes(source));
    } else {
      console.log("in last case");
      console.log(source);
      console.log(destination);
      value = value.filter((item) => item.sources.toLowerCase().includes(source));
      return value.filter((item) => item.destination.toLowerCase().includes(destination));
    }*/
    /*return console.log(term)*/
    if (source === undefined) {
     return value;
     }
     return value.filter((item) => item.destination.toLowerCase().includes(source));
     }
  }


import { Pipe, PipeTransform } from '@angular/core';
import {forEach} from "@angular/router/src/utils/collection";
import {isNgTemplate} from "@angular/compiler";
import {visitValue} from "@angular/compiler/src/util";

@Pipe({
  name: 'budgetFilter'
})
export class BudgetFilterPipe implements PipeTransform {
  transform(value: any, budget: any, isFlexible: any): any {
    if (budget === undefined || budget === null) {
      return value;
    }
    if (isFlexible){
    }
   return value.filter((item) => {
      if (item.budget < budget) {
        return item;
      }
      }
    );
  }
}


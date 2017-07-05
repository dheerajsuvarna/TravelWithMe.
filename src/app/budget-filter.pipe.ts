import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'budgetFilter'
})
export class BudgetFilterPipe implements PipeTransform {

  transform(value: any, budget: number): any {
    if (budget === undefined || budget === null) {
      console.log("in budget - undefined or null")
      return value;
    }
    console.log("in budget");
    console.log(budget);
    console.log(value);
    console.log(value.item.budget.valueOf());
    return value.filter((item) => item.budget.value < budget ? item : null);
  }

}


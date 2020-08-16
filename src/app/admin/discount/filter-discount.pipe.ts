import { Pipe, PipeTransform } from '@angular/core';
import { IDiscount } from 'src/shared/interfaces/discount.interface';

@Pipe({
  name: 'filterDiscount',
  pure: false
})
export class FilterDiscountPipe implements PipeTransform {

  transform(discountList: Array<IDiscount>, filterStr: string): Array<IDiscount> {
    if (filterStr == '') return discountList
    else
      return discountList.filter(discount => {
        return discount.id.toString().includes(filterStr) || discount.title.includes(filterStr) || discount.text.includes(filterStr)
      });
  }
}
import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from '../../../shared/interfaces/product.interface';

@Pipe({
  name: 'filterProduct',
  pure: false
})
export class FilterProductPipe implements PipeTransform {

  transform(productList: Array<IProduct>, filterStr: string): Array<IProduct> {
    if (filterStr == '') return productList
    else
      return productList.filter(prod => {
        return prod.id.toString().toLowerCase().includes(filterStr.toLowerCase())
          || prod.nameEN.toLowerCase().includes(filterStr.toLowerCase())
          || prod.description.toLowerCase().includes(filterStr.toLowerCase())
          || prod.weight.toLowerCase().includes(filterStr.toLowerCase())
          || prod.price.toString().toLowerCase().includes(filterStr.toLowerCase())
          || prod.category.nameEN.toLowerCase().includes(filterStr.toLowerCase())
      });
  }
}
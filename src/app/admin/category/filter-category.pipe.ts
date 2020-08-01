import { Pipe, PipeTransform } from '@angular/core';
import { ICategory } from '../../../shared/interfaces/category.interface';

@Pipe({
  name: 'filterCategory',
  pure: false
})
export class FilterCategoryPipe implements PipeTransform {

  transform(allCategories: Array<ICategory>, filterStr: string): Array<ICategory> {
    if (filterStr == '') return allCategories
    else
      return allCategories.filter(category => {
        return category.id.toString().includes(filterStr) || category.nameEN.includes(filterStr) || category.nameUA.includes(filterStr)
      });
  }
}
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  standalone: true
})
export class FilterPipe implements PipeTransform {

  transform(items: Array<any>, filterKey: string, filterString: string): Array<any> {
    return items.filter(value => {
      value[filterKey].startsWith(filterString);
    });
  }
}

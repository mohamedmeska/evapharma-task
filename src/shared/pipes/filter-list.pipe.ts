import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterList'
})
export class FilterListPipe implements PipeTransform {

  transform(list: any[], searchText: string): any[] {
    if(!list) {
      return [];
    }

    if(!searchText) {
      return list;
    }

    return list.filter((listItem) => {
      return listItem.name.toLowerCase().includes(searchText.toLowerCase());
    });
  }

}

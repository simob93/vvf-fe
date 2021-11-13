import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterOn'
})
/**
 *  Pipe Generica per ricerca es: autocomplete molto utile in caso di pipe | async
 */
export class FilterOnPipe implements PipeTransform {
  transform(list: any[], field: string, value: string, matchMode?: string): any {

    
    if (list == null) {

      return null;
    }
    if (value != null)  {

      if (!matchMode) {
        return list.filter(data => data[field].toLowerCase().includes(value));
      } else if(matchMode == 'startwith') {
        return list.filter(data => data[field].toLowerCase().startsWith(value));
      }
    }
    return list;
  }

}

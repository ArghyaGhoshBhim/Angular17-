import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort',
  standalone: true,
//   stop cashing and triggerd pipe in any changes for this component
  pure:false
})
export class SortPipe implements PipeTransform {
  transform(value: string[] | number[], dierection: 'asc' | 'desc') {
    const sorted = [...value];
    sorted.sort((a, b) => {
      if (dierection === 'asc') {
        return a > b ? 1 : -1;
      } else {
        return a > b ? -1 : 1;
      }
    });
    return sorted;
  }
}

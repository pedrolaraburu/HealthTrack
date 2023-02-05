import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'agePipe'
})
export class AgePipePipe implements PipeTransform {

  transform(value: Date): number {
    value = new Date(value);
    const today = new Date();
    const age = today.getFullYear() - value.getFullYear();
    const m = today.getMonth() - value.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < value.getDate())) {
      return age - 1;
    }
    return age;
  }

}

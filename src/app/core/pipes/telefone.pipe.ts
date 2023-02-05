import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'telefone'
})
export class TelefonePipe implements PipeTransform {

  transform(value: string): any {
    const ddd = value.slice(0, 2);
    const nove = value.slice(3, 4);
    const quatroPri = value.slice(3, 7);
    const quatroUlt = value.slice(7, 11);
    const valueFinal = `(${ddd}) ${nove} ${quatroPri}-${quatroUlt}`
    return valueFinal;
  }

}

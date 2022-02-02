import { Pipe, PipeTransform } from '@angular/core';
import { ePhase } from 'src/app/core/enums/phase.enum';

@Pipe({
  name: 'phase'
})
export class PhasePipe implements PipeTransform {

  transform(value: any): unknown {
    return ePhase[value];
  }

}

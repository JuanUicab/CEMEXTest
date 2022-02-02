import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'month'
})
export class MonthPipe implements PipeTransform {

  transform(value: string): unknown {
    let _month: string = "";

    switch (value) {
      case '1':
        _month = 'January';
        break;
        case '2':
        _month = 'February';
        break;
        case '3':
        _month = 'March';
        break;
        case '4':
        _month = 'April';
        break;
        case '5':
        _month = 'May';
        break;
        case '6':
        _month = 'June';
        break;
        case '7':
        _month = 'July';
        break;
        case '8':
        _month = 'August';
        break;
        case '9':
        _month = 'September';
        break;
        case '10':
        _month = 'October';
        break;
        case '11':
        _month = 'November';
        break;
        case '12':
        _month = 'December';
        break;
    }

    return _month;
  }

}

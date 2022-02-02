import { Pipe, PipeTransform } from '@angular/core';
import { eStatus } from 'src/app/core/enums/status.enum';

@Pipe({
    name: 'status',
})
export class StatusPipe implements PipeTransform {
    transform(value: string): string {
        let _status: string = '';
        switch (+value) {
            case eStatus.Active:
                _status = 'Active';
                break;
            case eStatus.PendingApproval:
                _status = 'Pending Approval';
                break;
            case eStatus.WaitingCompensation:
                _status = 'Waiting Compensation';
                break;
            default:
                _status = '';
                break;
        }
        return _status;
    }
}

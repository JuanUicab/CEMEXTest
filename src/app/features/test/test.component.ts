import { Component, OnInit } from '@angular/core';
import { iColumn } from 'src/app/core/entities/column.model';
import { iData } from 'src/app/core/entities/data.model';
import { iFilter } from 'src/app/core/entities/filter.model';
import { eColumnType } from 'src/app/core/enums/column-type.enum';
import { FilterService } from 'src/app/core/services/filter.service';

@Component({
    selector: 'app-test',
    templateUrl: './test.component.html',
    styleUrls: ['./test.component.scss'],
})
export class TestComponent implements OnInit {
    TOTAL: number = 0;
    FILTER_DATA: iData[] = [];

    COLUMNS: iColumn[] = [
        { Name: 'status', Label: 'Status', Type: eColumnType.Status },
        { Name: 'supplierName', Label: 'Supplier Name', Type: eColumnType.Text },
        { Name: 'month', Label: 'Month', Type: eColumnType.Month },
        { Name: 'phase', Label: 'Phase', Type: eColumnType.Phase },
        { Name: 'internalOrder', Label: 'Internal Order', Type: eColumnType.Text },
        { Name: 'amount', Label: 'Amount (USD)', Type: eColumnType.Amount },
    ];

    DATA: iData[] = [
        {
            Status: '1',
            SupplierName: 'Jakub Zavazal',
            Month: '3',
            Phase: '4',
            InternalOrder: '10024234',
            Amount: 5120,
        },
        {
            Status: '1',
            SupplierName: 'Jonathan Holden',
            Month: '4',
            Phase: '2',
            InternalOrder: '10024299',
            Amount: 5120,
        },
        {
            Status: '2',
            SupplierName: 'Miguel Zavala',
            Month: '3',
            Phase: '1',
            InternalOrder: '10023211',
            Amount: 4430,
        },
        {
            Status: '2',
            SupplierName: 'Vlad Titus Tudor',
            Month: '2',
            Phase: '3',
            InternalOrder: '10024567',
            Amount: 3320,
        },
        {
            Status: '3',
            SupplierName: 'Aleksey Romanyuk',
            Month: '2',
            Phase: '3',
            InternalOrder: '10024023',
            Amount: 5120,
        },
        {
            Status: '3',
            SupplierName: 'Carlos Francisco Rocha Ceballos',
            Month: '4',
            Phase: '1',
            InternalOrder: '10039493',
            Amount: 5300,
        },
    ];

    constructor(private readonly filterService: FilterService) {}

    ngOnInit(): void {
        const _emptyFilter: iFilter = {
            Name: '',
            Keys: [],
            Status: [],
            Phases: [],
            Months: [],
        };
        this.getFilters(_emptyFilter);
    }

    getFilters(Filter: any) {
        const _filter: iFilter = Filter as iFilter;
        if (_filter.Name !== '') {
            this.FILTER_DATA = this.filterService.filterData(this.DATA, _filter.Name, _filter.Keys);
        } else {
            this.FILTER_DATA = this.DATA;
        }

        this.TOTAL = 0;
        for (const _data of this.FILTER_DATA) {
            this.TOTAL += _data.Amount;
        }
    }
}

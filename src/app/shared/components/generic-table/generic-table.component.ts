import { Component, Input, OnInit } from '@angular/core';
import { iColumn } from 'src/app/core/entities/column.model';

@Component({
    selector: 'app-generic-table',
    templateUrl: './generic-table.component.html',
    styleUrls: ['./generic-table.component.scss'],
})
export class GenericTableComponent implements OnInit {
    @Input() COLUMNS: iColumn[] = [];
    @Input() DATA: any[] = [];
    @Input() TOTAL: number = 0;

    constructor() {}

    ngOnInit(): void {
    }

    trackByItems(index: number, item: any): number {
      return item.id;
    }
}

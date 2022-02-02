import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { debounceTime, Subscription, tap } from 'rxjs';
import { iItemSelect } from 'src/app/core/entities/itemSelect.model';
import { iFilter } from '../../../core/entities/filter.model';
import { ModalService } from '../modal/modal.service';

@Component({
    selector: 'app-filters-bar',
    templateUrl: './filters-bar.component.html',
    styleUrls: ['./filters-bar.component.scss'],
})
export class FiltersBarComponent implements OnInit, OnDestroy {
    SUBSCRIPTIONS: Subscription = new Subscription();
    SEARCH_NAME: FormControl = new FormControl();
    PHASES: iItemSelect[] = [];
    MONTHS: iItemSelect[] = [];
    SELECTED_PHASES: iItemSelect[] = [];
    SELECTED_MONTHS: iItemSelect[] = [];
    TOTAL_PHASES: string = '';
    TOTAL_MONTHS: string = '';

    FORM!: FormGroup;

    @Output() SEND_NAME: EventEmitter<iFilter> = new EventEmitter();

    @Output() SEND_FILTERS: EventEmitter<iFilter> = new EventEmitter();

    constructor(private readonly modalService: ModalService, private formBuilder: FormBuilder) {}

    ngOnDestroy(): void {
        this.SUBSCRIPTIONS.unsubscribe();
    }

    ngOnInit(): void {
        this.initForm();
        this.loadMonths();
        this.loadPhases();
        this.createSubscription();
    }

    initForm() {
        this.FORM = this.formBuilder.group({
            Active: [false],
            Pending_Approval: [false],
            Waiting_Compensation: [false],
            Phase: [null],
            Month: [null],
        });
    }

    showFilters(Id: string): void {
        this.modalService.open(Id);
    }

    clearFilters(): void {
        this.FORM.reset();
        this.findName('', ['Status']);
    }

    createSubscription() {
        const _search = this.SEARCH_NAME.valueChanges
            .pipe(
                debounceTime(500),
                tap((result) => {
                    this.findName(result, ['SupplierName']);
                })
            )
            .subscribe();

        this.SUBSCRIPTIONS.add(_search);
    }

    findName(Name: string, Keys: string[]) {
        const _filter: iFilter = {
            Name: Name,
            Keys: Keys,
            Status: [],
            Phases: [],
            Months: [],
        };

        this.SEND_NAME.emit(_filter);
    }

    closeModal(Id: string) {
        this.modalService.close(Id);
    }

    closeModalAction(Id: string) {
        this.modalService.close(Id);
    }

    loadPhases() {
        this.PHASES = [
            { Name: 'Research', Selected: false },
            { Name: 'Ideation', Selected: false },
            { Name: 'Development', Selected: false },
            { Name: 'Deployment', Selected: false },
        ];
    }

    loadMonths() {
        this.MONTHS = [
            { Name: 'January', Selected: false },
            { Name: 'February', Selected: false },
            { Name: 'March', Selected: false },
            { Name: 'April', Selected: false },
            { Name: 'May', Selected: false },
            { Name: 'June', Selected: false },
            { Name: 'July', Selected: false },
            { Name: 'August', Selected: false },
            { Name: 'September', Selected: false },
            { Name: 'October', Selected: false },
            { Name: 'November', Selected: false },
            { Name: 'December', Selected: false },
        ];
    }

    addOrDeleteElement(Origin: iItemSelect[], List: iItemSelect[], element: iItemSelect, index: number, isPhase: boolean) {
        if (isPhase) {
            for (const _month of this.MONTHS) {
                _month.Selected = false;
            }
            this.SELECTED_MONTHS = [];
        } else {
            for (const _month of this.PHASES) {
                _month.Selected = false;
            }
            this.SELECTED_PHASES = [];
        }
        const _indexElement: number = List.indexOf(element);
        const _indexInOrigin: number = Origin.indexOf(element);

        if (_indexElement < 0) {
            Origin[_indexInOrigin].Selected = true;
            List.push(element);
        } else {
            Origin[_indexInOrigin].Selected = false;
            List.splice(_indexElement, 1);
        }

        this.TOTAL_PHASES = `(${this.SELECTED_PHASES.length.toString()})`;
        this.TOTAL_MONTHS = `(${this.SELECTED_MONTHS.length.toString()})`;

        this.FORM.patchValue({
            Phase: this.SELECTED_PHASES.length > 0 ? this.SELECTED_PHASES[0] : null,
            Month: this.SELECTED_MONTHS.length > 0 ? this.SELECTED_MONTHS[0] : null,
        });

        this.FORM.patchValue({
            Active: false,
            Pending_Approval: false,
            Waiting_Compensation: false,
        });

        if (isPhase) {
            this.SELECTED_PHASES.length > 0 ? this.findName(`${index + 1}`, ['Phase']) : this.findName('', ['Phase']);
        } else {
            this.SELECTED_MONTHS.length > 0 ? this.findName(`${index + 1}`, ['Month']) : this.findName('', ['Month']);
        }
    }

    isInArray(List: iItemSelect[], element: iItemSelect) {
        const _indexElement: number = List.indexOf(element);

        return _indexElement > -1;
    }

    trackByItems(index: number, elemento: any): string | number {
        return elemento.id;
    }

    unmarkFilter(Filter: string) {
        switch (Filter) {
            case 'Active':
                this.FORM.patchValue({
                    Active: false,
                });
                break;
            case 'Pending_Approval':
                this.FORM.patchValue({
                    Pending_Approval: false,
                });
                break;
            case 'Waiting_Compensation':
                this.FORM.patchValue({
                    Waiting_Compensation: false,
                });
                break;
            case 'Phase':
                this.FORM.patchValue({
                    Phase: null,
                });
                break;
            case 'Month':
                this.FORM.patchValue({
                    Month: null,
                });
                break;
        }
    }

    updateTable(Status: string) {
        this.FORM.patchValue({
            Active: Status === '1',
            Pending_Approval: Status === '2',
            Waiting_Compensation: Status === '3',
        });

        if (this.FORM.controls['Active'].value || this.FORM.controls['Pending_Approval'].value || this.FORM.controls['Waiting_Compensation'].value) {
            this.findName(Status, ['Status']);
        } else {
            this.findName('', ['Status']);
        }
    }
}

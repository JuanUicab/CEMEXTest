import { Component, ElementRef, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ModalService } from './modal.service';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class ModalComponent implements OnInit {
    @Input() ID!: string;
    private ELEMENT: any;

    constructor(private modalService: ModalService, private elementRef: ElementRef) {
        this.ELEMENT = elementRef.nativeElement;
    }

    ngOnInit(): void {
        if (!this.ID) {
            console.error('modal must have an id');
            return;
        }

        document.body.appendChild(this.ELEMENT);

        this.ELEMENT.addEventListener('click', (el: any) => {
            if (el.target.className === 'app-modal') {
                this.close();
            }
        });

        this.modalService.add(this);
    }

    ngOnDestroy(): void {
        this.modalService.remove(this.ID);
        this.ELEMENT.remove();
    }

    open(): void {
        this.ELEMENT.style.display = 'block';
        document.body.classList.add('app-modal-open');
    }

    close(): void {
        this.ELEMENT.style.display = 'none';
        document.body.classList.remove('app-modal-open');
    }

    addDeleteItem() {}
}

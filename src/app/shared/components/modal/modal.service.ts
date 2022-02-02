import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class ModalService {
    private MODALS: any[] = [];

    add(Modal: any) {
        this.MODALS.push(Modal);
    }

    remove(Id: string) {
        this.MODALS = this.MODALS.filter((x) => x.ID !== Id);
    }

    open(Id: string) {
        const _modal = this.MODALS.find((x) => x.ID === Id);
        _modal.open();
    }

    close(Id: string) {
        const _modal = this.MODALS.find((x) => x.ID === Id);
        _modal.close();
    }
}

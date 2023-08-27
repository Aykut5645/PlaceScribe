import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-map-modal',
    templateUrl: './map-modal.component.html',
    styleUrls: ['./map-modal.component.scss'],
})
export class MapModalComponent {
    @Input() modal: { isOpen: boolean };
    @Input() placeDetails: any;

    constructor() {}

    closeModalHandler(): void {
        this.modal = { isOpen: false };
    }
}

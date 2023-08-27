import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { PlaceDetailsSelector } from '../../+state/selectors';
import { Store } from '@ngrx/store';
import { PlaceApiActions } from '../../+state/actions';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-map-modal',
    templateUrl: './map-modal.component.html',
    styleUrls: ['./map-modal.component.scss'],
})
export class MapModalComponent implements OnInit, OnChanges {
    @Input() isOpen: boolean;
    @Input() placeId: string;
    placeDetails: Observable<any>;

    constructor(private store: Store) {}

    ngOnInit(): void {
        this.placeDetails = this.store.select(PlaceDetailsSelector.getPlaceDetails);
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (this.placeId) {
            this.store.dispatch(PlaceApiActions.loadPlaceDetails({ placeId: this.placeId }));
            this.isOpen = true;
        }
    }

    closeModalHandler(): void {
        this.isOpen = false;
    }
}

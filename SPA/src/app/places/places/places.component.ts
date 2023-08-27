import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { NzModalService } from 'ng-zorro-antd/modal';

import { PlaceApiActions } from '../+state/actions';
import { CurrentUserSelectors } from '../../+state/selectors';
import { PlaceDetailsSelector, PlacesListSelector } from '../+state/selectors';
import { ModalTypesEnum } from '../../../shared/enums/modal-types';

@Component({
    selector: 'app-places',
    templateUrl: './places.component.html',
    styleUrls: ['./places.component.scss'],
})
export class PlacesComponent implements OnInit {
    places: Observable<any[]>;
    placesLoading: Observable<boolean>;
    currentUserId: Observable<string>;
    currentPlaceDetails$: Observable<any>;

    userId: string;
    isMapModalOpen: { isOpen: boolean } = { isOpen: false };
    isEditModalOpen: { isOpen: boolean } = { isOpen: false };
    modalTypes = ModalTypesEnum;

    constructor(
        private store: Store,
        private route: ActivatedRoute,
        private modalService: NzModalService,
    ) {}

    ngOnInit(): void {
        this.route.params.subscribe((params: Params) => {
            if (params['userId']) {
                this.userId = params['userId'];
                this.store.dispatch(PlaceApiActions.loadPlacesByUserId({ userId: this.userId }));
            }
        });
        this.getData();
    }

    openModalHandler(modalInfo: { type: string, placeId: string }): void {
        modalInfo.type === this.modalTypes.EDIT
            ? this.isEditModalOpen = { isOpen: true }
            : this.isMapModalOpen = { isOpen: true };
        this.loadAndGetPlaceDetails(modalInfo.placeId);
    }

    showDeleteHandler(placeId: string): void {
        this.modalService.confirm({
            nzTitle: `Do you want to delete this place?`,
            nzOkText: 'Yes',
            nzOkDanger: true,
            nzOkType: 'primary',
            nzCancelText: 'No',
            nzOnOk: () => this.store.dispatch(PlaceApiActions.deletePlace({ userId: this.userId, placeId: placeId })),
            nzOnCancel: () => {},
        });
    }

    loadAndGetPlaceDetails(placeId: string): void {
        this.store.dispatch(PlaceApiActions.loadPlaceDetails({ placeId: placeId }));
        this.currentPlaceDetails$ = this.store.select(PlaceDetailsSelector.getPlaceDetails);
    }

    getData(): void {
        this.places = this.store.select(PlacesListSelector.getPlacesList);
        this.currentUserId = this.store.select(CurrentUserSelectors.getCurrentUserId);
        this.placesLoading = this.store.select(PlacesListSelector.getPlacesListLoading);
    }
}

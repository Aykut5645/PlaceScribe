import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { PlaceApiActions } from '../+state/actions';
import { ActivatedRoute, Params } from '@angular/router';
import { PlaceDetailsSelector, PlacesListSelector } from '../+state/selectors';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
    selector: 'app-places',
    templateUrl: './places.component.html',
    styleUrls: ['./places.component.scss'],
})
export class PlacesComponent implements OnInit {
    places: Observable<any[]> | undefined;
    userId: string = '';
    isModalOpen: boolean = false;
    isEditModalOpen: boolean = false;
    placeDetails: any;
    form!: FormGroup;

    mapOptions: google.maps.MapOptions = {
        center: { lat: 40.748817, lng: -73.985428 },
        zoom: 14,
    };
    marker = {
        position: { lat: 38.9987208, lng: -77.2538699 },
    };

    constructor(
        private store: Store,
        private route: ActivatedRoute,
        private modalService: NzModalService,
        private fb: FormBuilder,
    ) {}

    ngOnInit(): void {
        this.route.params.subscribe((params: Params) => {
            this.userId = params['userId'];
        });

        this.store.dispatch(PlaceApiActions.loadPlacesByUserId({ userId: this.userId }));
        this.places = this.store.select(PlacesListSelector.getPlacesList);
    }

    openModalHandler(): void {
        this.isModalOpen = true;
    }

    closeModalHandler(): void {
        this.isModalOpen = false;
    }

    submitHandler(): void {
        this.store.dispatch(
            PlaceApiActions.updatePlace({
                placeId: this.placeDetails?.id,
                creatorId: this.placeDetails?.creator,
                place: { ...this.form.value },
            }),
        );
        this.closeEditModalHandler();
    }

    closeEditModalHandler(): void {
        this.isEditModalOpen = !this.isEditModalOpen;
    }

    openEditModalHandler(placeId: string): void {
        this.store.dispatch(PlaceApiActions.loadPlaceDetails({ placeId: placeId }));
        this.store.select(PlaceDetailsSelector.getPlaceDetails).subscribe(placeDetails => {
            this.placeDetails = placeDetails;
            this.createForm();
            this.isEditModalOpen = true;
        });
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

    createForm(): void {
        this.form = this.fb.group({
            title: [this.placeDetails ? this.placeDetails.title : null, [Validators.required]],
            description: [
                this.placeDetails ? this.placeDetails.description : null,
                [Validators.required, Validators.minLength(6)],
            ],
        });
    }
}

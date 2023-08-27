import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { PlaceApiActions } from '../+state/actions';
import { ActivatedRoute, Params } from '@angular/router';
import { PlaceDetailsSelector, PlacesListSelector } from '../+state/selectors';
import { Observable, Subject } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { switchMap, takeUntil } from 'rxjs/operators';
import { CurrentUserSelectors } from '../../+state/selectors';

@Component({
    selector: 'app-places',
    templateUrl: './places.component.html',
    styleUrls: ['./places.component.scss'],
})
export class PlacesComponent implements OnInit, OnDestroy {
    places: any[];
    placesLoading: Observable<boolean>;
    userId: string = '';
    isModalOpen: boolean = false;
    isEditModalOpen: boolean = false;
    placeDetails: any;
    form!: FormGroup;
    currentUserId: Observable<string>;
    currentPlaceId: string;
    private destroy$ = new Subject<void>();

    constructor(
        private store: Store,
        private route: ActivatedRoute,
        private modalService: NzModalService,
        private fb: FormBuilder,
    ) {}

    ngOnInit(): void {
        this.route.params
            .pipe(
                switchMap((params: Params) => {
                    this.userId = params['userId'];
                    this.store.dispatch(PlaceApiActions.loadPlacesByUserId({ userId: this.userId }));
                    this.currentUserId = this.store.select(CurrentUserSelectors.getCurrentUserId);
                    this.placesLoading = this.store.select(PlacesListSelector.getPlacesListLoading);
                    return this.store.select(PlacesListSelector.getPlacesList);
                }),
                takeUntil(this.destroy$),
            )
            .subscribe((places) => {
                this.places = places;
            });
    }

    getGridStyle() {
        if (this.places.length === 1) {
            return { 'grid-template-columns': '1fr', 'justify-content': 'center' };
        } else {
            return { 'grid-template-columns': '1fr 1fr' };
        }
    }

    openModalHandler(placeId: string): void {
        this.currentPlaceId = placeId;
        this.isModalOpen = !this.isModalOpen;
    }

    get titleIsValid() {
        return this.form.get('title')?.invalid && this.form.get('title')?.touched;
    }

    get descriptionIsValid() {
        return this.form.get('description')?.invalid && this.form.get('description')?.touched;
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
        this.isEditModalOpen = true;
    }

    openEditModalHandler(placeId: string): void {
        this.store.dispatch(PlaceApiActions.loadPlaceDetails({ placeId: placeId }));
        this.store.select(PlaceDetailsSelector.getPlaceDetails).subscribe((placeDetails) => {
            this.placeDetails = placeDetails;
            this.createForm();
        });
        this.isEditModalOpen = true;
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
    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}

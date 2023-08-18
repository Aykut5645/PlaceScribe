import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { PlaceApiActions } from '../+state/actions';
import { ActivatedRoute, Params } from '@angular/router';
import { PlacesListSelector } from '../+state/selectors';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-places',
    templateUrl: './places.component.html',
    styleUrls: ['./places.component.scss'],
})
export class PlacesComponent implements OnInit {
    places: Observable<any[]> | undefined;
    userId: string = '';
    isModalOpen: boolean = false;
    mapCenter: google.maps.LatLngLiteral = { lat: 40.748817, lng: -73.985428 };
    mapZoom = 15; // Adjust the zoom level as needed

    constructor(private store: Store, private route: ActivatedRoute) {}

    openModalHandler(): void {
        this.isModalOpen = true;
    }

    closeModalHandler(): void {
        this.isModalOpen = false;
    }

    ngOnInit(): void {
        this.route.params.subscribe((params: Params) => {
            this.userId = params['userId'];
        });
        this.store.dispatch(PlaceApiActions.loadPlacesByUserId({ userId: this.userId }));
        this.places = this.store.select(PlacesListSelector.getPlacesList);
    }
}

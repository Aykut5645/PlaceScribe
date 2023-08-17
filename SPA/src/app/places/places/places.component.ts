import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { PlaceApiActions } from '../+state/actions';

@Component({
    selector: 'app-places',
    templateUrl: './places.component.html',
    styleUrls: ['./places.component.scss'],
})
export class PlacesComponent implements OnInit {
    places: any[] | null = null;

    constructor(private store: Store) {}

    ngOnInit(): void {
        this.store.dispatch(PlaceApiActions.loadPlacesByUserId({ userId: '64dd0bf8bea517374ad58dbc' }));
    }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';

import { PlacesRoutingModule } from './places-routing.module';
import { PlacesComponent } from './places/places.component';
import { HandlePlaceComponent } from './handle-place/handle-place.component';
import { PlaceEffects } from './+state/effects/place.effects';
import { placeReducers } from './+state/reducers/place.reducers';
import { GoogleMapsModule } from '@angular/google-maps';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { PlaceEditComponent } from './place-edit/place-edit.component';

@NgModule({
    declarations: [PlacesComponent, HandlePlaceComponent, PlaceEditComponent],
    imports: [
        CommonModule,
        PlacesRoutingModule,
        NzButtonModule,
        NzIconModule,
        NzInputModule,
        ReactiveFormsModule,
        StoreModule.forFeature('places', placeReducers),
        EffectsModule.forFeature([PlaceEffects]),
        GoogleMapsModule,
        NzModalModule,
    ],
})
export class PlacesModule {}

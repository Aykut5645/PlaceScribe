import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlacesRoutingModule } from './places-routing.module';
import { PlacesComponent } from './places/places.component';
import { HandlePlaceComponent } from './handle-place/handle-place.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { ReactiveFormsModule } from '@angular/forms';
import { PlaceDetailsComponent } from './place-details/place-details.component';

@NgModule({
    declarations: [PlacesComponent, HandlePlaceComponent, PlaceDetailsComponent],
    imports: [
        CommonModule,
        PlacesRoutingModule,
        NzButtonModule,
        NzIconModule,
        NzInputModule,
        ReactiveFormsModule,
    ],
})
export class PlacesModule {}

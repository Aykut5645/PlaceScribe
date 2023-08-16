import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlacesRoutingModule } from './places-routing.module';
import { UsersComponent } from '../auth/users/users.component';
import { PlacesComponent } from './places/places.component';
import { HandlePlaceComponent } from './handle-place/handle-place.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [UsersComponent, PlacesComponent, HandlePlaceComponent],
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

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlacesRoutingModule } from './places-routing.module';
import { UsersComponent } from '../auth/users/users.component';

@NgModule({
    declarations: [UsersComponent],
    imports: [CommonModule, PlacesRoutingModule],
})
export class PlacesModule {}

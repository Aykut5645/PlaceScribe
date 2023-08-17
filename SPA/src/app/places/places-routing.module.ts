import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlacesComponent } from './places/places.component';
import { HandlePlaceComponent } from './handle-place/handle-place.component';
import { PlaceDetailsComponent } from './place-details/place-details.component';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'users' },
    {
        path: '',
        component: PlacesComponent,
    },
    {
        path: 'create',
        component: HandlePlaceComponent,
    },
    {
        path: 'details',
        component: PlaceDetailsComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PlacesRoutingModule {}

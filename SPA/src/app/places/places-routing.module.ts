import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlacesComponent } from './places/places.component';
import { HandlePlaceComponent } from './handle-place/handle-place.component';

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
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PlacesRoutingModule {}

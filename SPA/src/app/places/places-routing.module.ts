import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlacesComponent } from './places/places.component';
import { HandlePlaceComponent } from './handle-place/handle-place.component';
import { AuthGuard } from '../../shared/guards/auth.guard';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'users' },
    {
        path: 'user/:userId',
        component: PlacesComponent,
    },
    {
        path: 'create',
        component: HandlePlaceComponent,
        canActivate: [AuthGuard],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PlacesRoutingModule {}

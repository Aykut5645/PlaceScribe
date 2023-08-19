import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: 'auth',
                loadChildren: () => import('../auth/auth.module').then((m) => m.AuthModule),
            },
            {
                path: 'places',
                loadChildren: () => import('../places/places.module').then((m) => m.PlacesModule),
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class LayoutRoutingModule {}

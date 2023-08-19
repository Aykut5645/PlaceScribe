import { NgModule } from '@angular/core';
import { RouterModule, Routes, RunGuardsAndResolvers } from '@angular/router';

import { LayoutComponent } from './layout/layout.component';
import { AuthGuard } from '../../shared/guards/auth.guard';
import { LoginRegisterGuard } from '../../shared/guards/login-register.guard';

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
                runGuardsAndResolvers: 'always' as RunGuardsAndResolvers,
                canActivate: [AuthGuard],
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

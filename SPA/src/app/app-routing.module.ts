import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'auth' },
    { path: '', loadChildren: () => import('./layout/layout.module').then((m) => m.LayoutModule) },
    { path: '**', redirectTo: 'auth' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}

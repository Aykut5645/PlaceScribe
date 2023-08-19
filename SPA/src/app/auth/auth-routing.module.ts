import { NgModule } from '@angular/core';
import { RouterModule, Routes, RunGuardsAndResolvers } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UsersComponent } from './users/users.component';
import { LoginRegisterGuard } from '../../shared/guards/login-register.guard';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'users' },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [LoginRegisterGuard],
    },
    {
        path: 'register',
        component: RegisterComponent,
        canActivate: [LoginRegisterGuard],
    },
    {
        path: 'users',
        component: UsersComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AuthRoutingModule {}

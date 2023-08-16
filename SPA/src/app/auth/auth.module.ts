import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AuthRoutingModule } from './auth-routing.module';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { UsersComponent } from './users/users.component';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { authReducers } from './+state/reducers/auth.reducers';
import { AuthEffects } from './+state/effects/auth.effects';

@NgModule({
    declarations: [RegisterComponent, LoginComponent, UsersComponent, AuthLayoutComponent],
    imports: [
        CommonModule,
        AuthRoutingModule,
        NzInputModule,
        NzButtonModule,
        NzIconModule,
        ReactiveFormsModule,
        EffectsModule.forFeature([AuthEffects]),
        StoreModule.forFeature('auth', authReducers),
    ],
})
export class AuthModule {}

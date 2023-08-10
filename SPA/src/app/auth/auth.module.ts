import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { UsersComponent } from './users/users.component';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';

@NgModule({
    declarations: [RegisterComponent, LoginComponent, UsersComponent, AuthLayoutComponent],
    imports: [CommonModule, AuthRoutingModule, NzInputModule, NzButtonModule, NzIconModule, ReactiveFormsModule],
})
export class AuthModule {}

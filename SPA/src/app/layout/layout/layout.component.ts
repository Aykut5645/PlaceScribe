import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { Store } from '@ngrx/store';
import { AuthApiActions } from '../../auth/+state/actions';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
    constructor(
        private authService: AuthService,
        private store: Store,
    ) {}

    ngOnInit(): void {}

    isLoggedIn(): boolean {
        return this.authService.loggedIn();
    }

    getUserId(): string {
        return this.authService.getUser()?.userId;
    }

    logoutHandler(): void {
        this.store.dispatch(AuthApiActions.logout());
    }
}

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Store } from '@ngrx/store';
import { AuthApiActions } from '../../auth/+state/actions';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
    userId: string;

    constructor(private authService: AuthService, private store: Store) {}

    ngOnInit(): void {
        this.userId = this.authService.getUser().userId;
    }

    isLoggedIn(): boolean {
        return this.authService.loggedIn();
    }

    logoutHandler(): void {
        this.store.dispatch(AuthApiActions.logout());
    }
}

import { Component, OnInit } from '@angular/core';
import { AuthUiActions } from './auth/+state/actions';
import { Store } from '@ngrx/store';
import { AuthService } from '../shared/services/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

    constructor(
        private store: Store,
        private authService: AuthService,
    ) {}

    ngOnInit(): void {
        this.handleToken();
    }

    private handleToken(): void {
        const token: string = this.authService.getToken();
        const user: any = this.authService.getUser();

        if (token && user && this.authService.loggedIn()) {
            this.store.dispatch(
                AuthUiActions.loginSuccess({
                    ...user,
                    token,
                }),
            );
        }
    }
}

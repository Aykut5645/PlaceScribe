import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { AuthApiActions, AuthUiActions } from '../actions';
import { AuthService } from '../../../services/auth.service';

@Injectable()
export class AuthEffects {
    constructor(
        public action$: Actions,
        private authService: AuthService,
        private router: Router,
    ) {}

    login$ = createEffect(() => {
        return this.action$.pipe(
            ofType(AuthApiActions.login),
            switchMap((_) => {
                return this.authService.login({ email: _.email, password: _.password }).pipe(
                    map((userData) => {
                        return AuthUiActions.loginSuccess(userData);
                    }),
                    catchError((error) => {
                        return of(
                            AuthUiActions.loginFail({
                                error,
                            }),
                        );
                    }),
                );
            }),
        );
    });

    register$ = createEffect(() => {
        return this.action$.pipe(
            ofType(AuthApiActions.register),
            switchMap((_) => {
                return this.authService.register(_).pipe(
                    switchMap((message) => {
                        return [AuthUiActions.registerSuccess({ message: 'ok' })];
                    }),
                    tap((_) => {
                        this.router.navigate(['/auth/login']);
                    }),
                    catchError((error) => {
                        return of(
                            AuthUiActions.registerFail({
                                error,
                            }),
                        );
                    }),
                );
            }),
        );
    });
}

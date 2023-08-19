import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import { AuthApiActions, AuthUiActions } from '../actions';
import { AuthService } from '../../../../shared/services/auth.service';

@Injectable()
export class AuthEffects {
    constructor(
        public action$: Actions,
        private authService: AuthService,
        private router: Router,
    ) {}

    loadAllUsers$ = createEffect(() => {
        return this.action$.pipe(
            ofType(AuthApiActions.loadAllUsers),
            switchMap((_) =>
                this.authService.getAllUsers().pipe(
                    switchMap((_) => {
                        return [AuthUiActions.loadAllUsersSuccess(_)];
                    }),
                    catchError((error) => {
                        return of(
                            AuthUiActions.loadAllUsersFail({
                                error,
                            }),
                        );
                    }),
                ),
            ),
        );
    });

    login$ = createEffect(() => {
        return this.action$.pipe(
            ofType(AuthApiActions.login),
            switchMap((_) => {
                return this.authService.login({ email: _.email, password: _.password }).pipe(
                    map((loginResData) => {
                        this.authService.setToken(loginResData.token);
                        this.authService.setUser({ userId: loginResData.userId, email: loginResData.email });

                        return AuthUiActions.loginSuccess(loginResData);
                    }),
                    tap((_) => {
                        this.router.navigate(['/auth/users']);
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

    logout$ = createEffect(() =>
        this.action$.pipe(
            ofType(AuthApiActions.logout),
            tap(() => {
                this.authService.logout();
                this.router.navigate(['/auth/login']);
            }),
            map(() => AuthUiActions.logoutSuccess()),
        ),
    );
}

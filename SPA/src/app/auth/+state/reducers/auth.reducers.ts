import { combineReducers, createReducer, on } from '@ngrx/store';
import { AuthApiActions, AuthUiActions } from '../actions';

import * as State from '../auth.state';

export const isLoadingButtonReducer = createReducer<boolean>(
    State.initialLoadingButton,
    on(AuthApiActions.login, (): boolean => {
        return true;
    }),
    on(AuthUiActions.loginSuccess, (): boolean => {
        return false;
    }),
    on(AuthUiActions.loginFail, (): boolean => {
        return false;
    }),
);

export const authReducers = combineReducers<State.State>({
    isLoadingButton: isLoadingButtonReducer,
});
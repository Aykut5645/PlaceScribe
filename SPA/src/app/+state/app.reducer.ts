import { combineReducers, createReducer, on } from '@ngrx/store';

import * as State from './app.state';
import { AuthApiActions, AuthUiActions } from '../auth/+state/actions';

export const currentUserReducer = createReducer<State.CurrentUserState>(
    State.initialCurrentUserState,
    on(AuthApiActions.login, (state): State.CurrentUserState => {
        return {
            ...state,
            loading: true,
        };
    }),
    on(AuthUiActions.loginSuccess, (state, { userId, email, token }): State.CurrentUserState => {
        return {
            ...state,
            user: { userId, email, token },
            loading: false,
            error: '',
        };
    }),
    on(AuthUiActions.loginFail, (state, { error }): State.CurrentUserState => {
        return {
            ...state,
            user: {
                email: '',
                token: '',
                userId: '',
            },
            loading: false,
            error: error.message,
        };
    }),
    on(AuthUiActions.logoutSuccess, (state): State.CurrentUserState => {
        return {
            ...state,
            user: {
                email: '',
                token: '',
                userId: '',
            },
            loading: false,
            error: '',
        };
    }),
);

export const applicationReducers = combineReducers<State.State>({
    currentUser: currentUserReducer,
});

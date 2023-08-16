import { ActionReducerMap, combineReducers, createReducer, on } from '@ngrx/store';

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
    on(AuthUiActions.loginSuccess, (state, payload): State.CurrentUserState => {
        console.log('Payload => ', payload);
        return {
            ...state,
            // user: userLoginResponse.user,
            loading: false,
            error: '',
        };
    }),
    on(AuthUiActions.loginFail, (state, { error }): State.CurrentUserState => {
        return {
            ...state,
            user: {},
            loading: false,
            error: error.message,
        };
    }),
);

export const applicationReducers = combineReducers<State.State>({
    currentUser: currentUserReducer,
});

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

export const usersReducer = createReducer<State.UsersListState>(
    State.initialUsersListState,
    on(AuthApiActions.loadAllUsers, (state): State.UsersListState => {
        return {
            ...state,
            loading: true,
        };
    }),
    on(AuthUiActions.loadAllUsersSuccess, (state, { users }): State.UsersListState => {
        return {
            loading: false,
            users,
            error: '',
        };
    }),
    on(AuthUiActions.loadAllUsersFail, (state, { error }): State.UsersListState => {
        return {
            loading: false,
            users: [],
            error: error.error,
        };
    }),
);

export const authReducers = combineReducers<State.State>({
    isLoadingButton: isLoadingButtonReducer,
    usersList: usersReducer,
});

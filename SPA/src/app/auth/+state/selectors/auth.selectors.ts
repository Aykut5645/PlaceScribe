import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from '../auth.state';

export const authState = createFeatureSelector<State>('auth');

// Loading button
export const getIsLoadingButton = createSelector(authState, (state) => state.isLoadingButton);

// Users list
export const getUsersListState = createSelector(authState, (state) => state.usersList);

export const getUsersList = createSelector(getUsersListState, (state) => state.users);

export const getUsersListLoading = createSelector(getUsersListState, (state) => state.loading);

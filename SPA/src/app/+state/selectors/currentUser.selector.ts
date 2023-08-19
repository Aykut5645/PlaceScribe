import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from '../app.state';

const getAppState = createFeatureSelector<State>('app');

export const getCurrentUserState = createSelector(getAppState, (state) => state.currentUser);

export const getCurrentUser = createSelector(getCurrentUserState, (state) => state.user);

export const getCurrentUserId = createSelector(getCurrentUser, (state) => state.userId);

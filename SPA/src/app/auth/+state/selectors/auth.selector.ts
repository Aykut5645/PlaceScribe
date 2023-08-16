import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from '../auth.state';

const getAuthFeatureState = createFeatureSelector<State>('auth');

export const getIsLoadingButton = createSelector(getAuthFeatureState, (state) => state.isLoadingButton);

import { createSelector } from '@ngrx/store';
import { placesState } from './+places-feature.selector';

const getPlacesListState = createSelector(
    placesState,
    (state) => state.placesList
);

export const getPlacesListLoading = createSelector(getPlacesListState, (state) => state.loading);

export const getPlacesList = createSelector(getPlacesListState, (state) => state.places);

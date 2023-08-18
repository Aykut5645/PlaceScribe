import { createSelector } from '@ngrx/store';
import { placesState } from './+places-feature.selector';

const getPlaceDetailsState = createSelector(
    placesState,
    (state) => state.placeDetails
);

export const getPlaceDetailsLoading = createSelector(getPlaceDetailsState, (state) => state.loading);

export const getPlaceDetails = createSelector(getPlaceDetailsState, (state) => state.place);

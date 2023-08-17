import { combineReducers, createReducer, on } from '@ngrx/store';

import * as State from '../place.state';
import { PlaceUiActions, PlaceApiActions } from '../actions';

export const placesListReducer = createReducer<State.PlacesListState>(
    State.initialPlaceListState,
    on(PlaceApiActions.loadPlacesByUserId, (state): State.PlacesListState => {
        return {
            ...state,
            loading: true,
        };
    }),
    on(PlaceUiActions.loadPlacesByUserIdSuccess, (state, { places }): State.PlacesListState => {
        return {
            ...state,
            error: '',
            loading: false,
            places,
        };
    }),
    on(PlaceUiActions.loadPlacesByUserIdFail, (state, { error }): State.PlacesListState => {
        return {
            ...state,
            loading: false,
            error: error.error,
        };
    }),
);

export const placeDetailsReducer = createReducer<State.PlaceDetailsState>(
    State.initialPlaceDetailsState,
    on(PlaceApiActions.loadPlaceDetails, (state): State.PlaceDetailsState => {
        return {
            ...state,
            loading: true,
        };
    }),
    on(PlaceUiActions.loadPlaceDetailsSuccess, (state, { place }): State.PlaceDetailsState => {
        return {
            ...state,
            error: '',
            loading: false,
            place,
        };
    }),
    on(PlaceUiActions.loadPlaceDetailsSuccess, (state, { error }): State.PlaceDetailsState => {
        return {
            ...state,
            loading: false,
            error: error,
        };
    }),
);

export const placeReducers = combineReducers<State.State>({
    placesList: placesListReducer,
    placeDetails: placeDetailsReducer,
});

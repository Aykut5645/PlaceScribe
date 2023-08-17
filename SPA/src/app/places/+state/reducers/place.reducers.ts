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
    on(
        PlaceUiActions.loadPlacesByUserIdSuccess,
        (state, payload): State.PlacesListState => {
            return {
                ...state,
                error: '',
                loading: false,
                places: payload
            };
        }
    ),
    on(PlaceUiActions.loadPlacesByUserIdFail, (state, { error }): State.PlacesListState => {
        return {
            ...state,
            loading: false,
            error: error.error,
        };
    }),
);

export const placeReducers = combineReducers<State.State>({
    placesList: placesListReducer,
    // @ts-ignore
    placeDetails: {},
});

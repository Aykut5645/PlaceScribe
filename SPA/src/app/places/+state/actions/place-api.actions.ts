import { createAction, props } from '@ngrx/store';

export const loadPlacesByUserId = createAction('[Place API] Load places by user ID', props<any>());

export const loadPlaceDetails = createAction('[Place API] Load place details', props<any>());

export const createPlace = createAction(
    '[Place API] Create place',
    props<{ createdPlace: { creator: string; address: string; title: string; description: string } }>(),
);

export const updatePlace = createAction('[Place API] Update place', props<any>());

export const deletePlace = createAction('[Place API] Delete place', props<any>());

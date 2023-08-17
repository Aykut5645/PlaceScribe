import { createAction, props } from '@ngrx/store';

export const loadPlaceByUserId = createAction('[Place API] Load place by user ID', props<any>());

export const loadPlaceDetails = createAction('[Place API] Load place details', props<any>());

export const createPlace = createAction('[Place API] Create place', props<any>());

export const updatePlace = createAction('[Place API] Update place', props<any>());

export const deletePlace = createAction('[Place API] Delete place', props<any>());

import { createAction, props } from '@ngrx/store';

export const loadPlacesByUserId = createAction('[Place API] Load places by user ID', props<{ userId: string }>());

export const loadPlaceDetails = createAction('[Place API] Load place details', props<{ placeId: string }>());

export const createPlace = createAction(
    '[Place API] Create place',
    props<{ createdPlace: { creator: string; address: string; title: string; description: string } }>(),
);

export const updatePlace = createAction(
    '[Place API] Update place',
    props<{ placeId: string; creatorId: string; place: { title: string; description: string } }>(),
);

export const deletePlace = createAction('[Place API] Delete place', props<{ userId: string; placeId}>());

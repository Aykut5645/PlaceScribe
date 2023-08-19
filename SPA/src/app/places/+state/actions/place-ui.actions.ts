import { createAction, props } from '@ngrx/store';

export const loadPlacesByUserIdSuccess = createAction(
    '[Place UI] Load places by user ID success',
    // props<{
    //     places: {
    //         creator: string;
    //         address: string;
    //         title: string;
    //         description: string;
    //         imageUrl: string;
    //         id: 'string';
    //     }[];
    // }>(),
    props<any>(),
);

export const loadPlacesByUserIdFail = createAction('[Place UI] Load places by user ID fail', props<any>());

export const loadPlaceDetailsSuccess = createAction('[Place UI] Load place details success', props<any>());

export const loadPlaceDetailsFail = createAction('[Place UI] Load place details error', props<any>());

export const createPlaceSuccess = createAction('[Place UI] Create place success', props<{ message: string, userId: string }>());

export const createPlaceFail = createAction('[Place UI] Create place fail', props<any>());

export const updatePlaceSuccess = createAction('[Place UI] Update place success', props<{ message: string }>());

export const updatePlaceFail = createAction('[Place UI] Update place fail', props<any>());

export const deletePlaceSuccess = createAction('[Place UI] Delete place success', props<{ message: string }>());

export const deletePlaceFail = createAction('[Place UI] Delete place fail', props<any>());

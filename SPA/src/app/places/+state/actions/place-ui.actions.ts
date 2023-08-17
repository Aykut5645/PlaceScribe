import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';

export const loadPlaceByUserIdSuccess = createAction('[Place UI] Load place by user ID success', props<any>());

export const loadPlaceByUserIdFail = createAction('[Place UI] Load place by user ID fail', props<any>());

export const loadPlaceDetailsSuccess = createAction('[Place UI] Load place details success', props<any>());

export const loadPlaceDetailsFail = createAction('[Place UI] Load place details error', props<any>());

export const createPlaceSuccess = createAction('[Place UI] Create place success', props<any>());

export const createPlaceFail = createAction('[Place UI] Create place fail', props<any>());

export const updatePlaceSuccess = createAction('[Place UI] Update place success', props<any>());

export const updatePlaceFail = createAction('[Place UI] Update place fail', props<any>());

export const registerFail = createAction('[Auth UI] Register Fail', props<{ error: HttpErrorResponse }>());

export const deletePlaceSuccess = createAction('[Place UI] Delete place success', props<any>());

export const deletePlaceFail = createAction('[Place UI] Delete place fail', props<any>());

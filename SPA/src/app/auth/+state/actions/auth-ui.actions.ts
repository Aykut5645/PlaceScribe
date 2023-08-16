import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';

export const loginSuccess = createAction('[Auth UI] Login Success', props<any>());

export const registerSuccess = createAction('[Auth UI] Register Success', props<any>());

export const loginFail = createAction('[Auth UI] Login Fail', props<{ error: HttpErrorResponse }>());

export const registerFail = createAction('[Auth UI] Register Fail', props<{ error: HttpErrorResponse }>());

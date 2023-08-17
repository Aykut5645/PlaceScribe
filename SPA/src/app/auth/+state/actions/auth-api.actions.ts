import { createAction, props } from '@ngrx/store';

export const login = createAction('[Auth API] Login', props<{ email: string; password: string }>());

export const register = createAction('[Auth API] Register', props<{ name: string; email: string; password: string }>());

export const loadAllUsers = createAction('[Auth API] Load all users');

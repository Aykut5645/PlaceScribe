import { createFeatureSelector } from '@ngrx/store';
import { State } from '../place.state';

export const placesState = createFeatureSelector<State>('places');

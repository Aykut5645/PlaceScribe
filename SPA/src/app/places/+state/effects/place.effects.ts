import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, of, switchMap } from 'rxjs';

import { PlaceApiActions, PlaceUiActions } from '../actions';
import { PlaceService } from '../../../../shared/services/place.service';

@Injectable()
export class PlaceEffects {
    constructor(
        public action$: Actions,
        private placeService: PlaceService,
        public router: Router,
        private store: Store,
    ) {}

    loadPlaceDetails$ = createEffect(() => {
        return this.action$.pipe(
            ofType(PlaceApiActions.loadPlaceDetails),
            switchMap((_) =>
                this.placeService.getPlaceDetails(_.placeId).pipe(
                    switchMap((_) => {
                        return [PlaceUiActions.loadPlaceDetailsSuccess(_)];
                    }),
                    catchError((error) => {
                        return of(
                            PlaceUiActions.loadPlaceDetailsFail({
                                error,
                            }),
                        );
                    }),
                ),
            ),
        );
    });

    loadPlacesByUserId$ = createEffect(() => {
        return this.action$.pipe(
            ofType(PlaceApiActions.loadPlacesByUserId),
            switchMap((_) =>
                this.placeService.getPlacesByUserId(_.userId).pipe(
                    switchMap((_) => {
                        return [PlaceUiActions.loadPlacesByUserIdSuccess(_)];
                    }),
                    catchError((error) => {
                        return of(
                            PlaceUiActions.loadPlacesByUserIdFail({
                                error,
                            }),
                        );
                    }),
                ),
            ),
        );
    });

    createPlace$ = createEffect(() => {
        return this.action$.pipe(
            ofType(PlaceApiActions.createPlace),
            switchMap((_) => {
                return this.placeService.createPlace(_.createdPlace).pipe(
                    switchMap((successObject) => {
                        return [PlaceUiActions.createPlaceSuccess(successObject)];
                    }),
                    catchError((error) =>
                        of(
                            PlaceUiActions.createPlaceFail({
                                error,
                            }),
                        ),
                    ),
                );
            }),
        );
    });

    updatePlace$ = createEffect(() => {
        return this.action$.pipe(
            ofType(PlaceApiActions.updatePlace),
            switchMap((_) =>
                this.placeService.updatePlace(_.placeId, _.place).pipe(
                    switchMap((successObject) => {
                        return [
                            PlaceUiActions.updatePlaceSuccess(successObject),
                            PlaceApiActions.loadPlacesByUserId({ userId: _.creatorId }),
                        ];
                    }),
                    catchError((error) =>
                        of(
                            PlaceUiActions.updatePlaceFail({
                                error,
                            }),
                        ),
                    ),
                ),
            ),
        );
    });

    deletePlace$ = createEffect(() => {
        return this.action$.pipe(
            ofType(PlaceApiActions.deletePlace),
            switchMap((_) =>
                this.placeService.deletePlace(_.placeId).pipe(
                    switchMap((successObject) => {
                        return [
                            PlaceUiActions.deletePlaceSuccess(successObject),
                            PlaceApiActions.loadPlacesByUserId({ userId: _.userId }),
                        ];
                    }),
                    catchError((error) =>
                        of(
                            PlaceUiActions.deletePlaceFail({
                                error,
                            }),
                        ),
                    ),
                ),
            ),
        );
    });
}

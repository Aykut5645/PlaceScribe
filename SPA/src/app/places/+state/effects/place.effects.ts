import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, of, switchMap } from 'rxjs';

import { PlaceApiActions, PlaceUiActions } from '../actions';
import { PlaceService } from '../../../services/place.service';

@Injectable()
export class PlaceEffects {
    constructor(
        public action$: Actions,
        private placeService: PlaceService,
        public router: Router,
        private store: Store
    ) {}

    loadPlaceDetails$ = createEffect(() => {
        return this.action$.pipe(
            ofType(PlaceApiActions.loadPlaceDetails),
            switchMap((_) =>
                this.placeService.getPlaceDetails(_).pipe(
                    switchMap((place) => {
                        return [PlaceUiActions.loadPlaceDetailsSuccess(place)];
                    }),
                    catchError((error) => {
                        return of(
                            PlaceUiActions.loadPlaceDetailsFail({
                                error,
                            })
                        );
                    })
                )
            )
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
                            })
                        );
                    })
                )
            )
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

    // editQuestion$ = createEffect(() => {
    //     return this.action$.pipe(
    //         ofType(QuestionsApiActions.editQuestion),
    //         switchMap((_) =>
    //             this.questionService.editQuestion(_.id, _.question).pipe(
    //                 switchMap((message) => {
    //                     return [
    //                         QuestionsUiActions.editQuestionSuccess(message),
    //                         QuestionsUiActions.uploadQuestionPhoto({
    //                             id: _.id,
    //                             form: _.form,
    //                         }),
    //                         QuestionsApiActions.loadAllQuestions(),
    //                     ];
    //                 }),
    //                 tap(() => this.router.navigate(['/admin/questions'])),
    //                 catchError((error) =>
    //                     of(
    //                         QuestionsUiActions.editQuestionFail({
    //                             error,
    //                         })
    //                     )
    //                 )
    //             )
    //         )
    //     );
    // });
    //
    // deleteQuestion$ = createEffect(() => {
    //     return this.action$.pipe(
    //         ofType(QuestionsApiActions.deleteQuestion),
    //         withLatestFrom(this.store.select(AllQuestionsSelector.getPagination)),
    //         switchMap(([_, pagination]) =>
    //             this.questionService.deleteQuestion(_.id).pipe(
    //                 switchMap((message) => {
    //                     if (pagination.currentPage > 1 && pagination.totalItems % 10 === 1) {
    //                         return [
    //                             QuestionsUiActions.deleteQuestionSuccess(message),
    //                             QuestionsUiActions.updatePageIndex({ pageIndex: pagination.currentPage - 1 }),
    //                         ];
    //                     }
    //                     return [
    //                         QuestionsUiActions.deleteQuestionSuccess(message),
    //                         QuestionsApiActions.loadAllQuestions(),
    //                     ];
    //                 }),
    //                 tap(() => this.router.navigate(['/admin/questions'])),
    //                 catchError((error) =>
    //                     of(
    //                         QuestionsUiActions.deleteQuestionFail({
    //                             error,
    //                         })
    //                     )
    //                 )
    //             )
    //         )
    //     );
    // });
    //
    // changePageIndex$ = createEffect(() => {
    //     return this.action$.pipe(
    //         ofType(QuestionsFilters.setQuestionsCategoryId, QuestionsFilters.setQuestionsSubCategoryId),
    //         switchMap(() => {
    //             return [QuestionsUiActions.updatePageIndex({ pageIndex: 1 })];
    //         })
    //     );
    // });
    //
    // checkAndUploadPhoto$ = createEffect(() => {
    //     return this.action$.pipe(
    //         ofType(QuestionsUiActions.uploadQuestionPhoto),
    //         switchMap((action) => {
    //             const actions: any[] = [];
    //
    //             if (action.form?.has('contentPhoto')) {
    //                 actions.push(
    //                     QuestionsApiActions.uploadContentPhoto({
    //                         id: action.id,
    //                         form: action.form,
    //                     }) as any
    //                 );
    //             }
    //
    //             if (action.form?.has('descriptionPhoto')) {
    //                 actions.push(
    //                     QuestionsApiActions.uploadDescriptionPhoto({
    //                         id: action.id,
    //                         form: action.form,
    //                     }) as any
    //                 );
    //             }
    //
    //             return actions;
    //         })
    //     );
    // });
    //
    // uploadContentPhoto$ = createEffect(() => {
    //     return this.action$.pipe(
    //         ofType(QuestionsApiActions.uploadContentPhoto),
    //         switchMap((_) =>
    //             this.questionService.uploadContentPhoto(_.id, _.form).pipe(
    //                 switchMap(() => {
    //                     return [QuestionsUiActions.uploadQuestionPhotoSuccess()];
    //                 }),
    //                 catchError((error) => {
    //                     return of(
    //                         QuestionsUiActions.uploadQuestionPhotoFail({
    //                             error,
    //                         })
    //                     );
    //                 })
    //             )
    //         )
    //     );
    // });
    //
    // uploadDescriptionPhoto$ = createEffect(() => {
    //     return this.action$.pipe(
    //         ofType(QuestionsApiActions.uploadDescriptionPhoto),
    //         switchMap((_) =>
    //             this.questionService.uploadDescriptionPhoto(_.id, _.form).pipe(
    //                 switchMap(() => {
    //                     return [QuestionsUiActions.uploadQuestionPhotoSuccess()];
    //                 }),
    //                 catchError((error) => {
    //                     return of(
    //                         QuestionsUiActions.uploadQuestionPhotoFail({
    //                             error,
    //                         })
    //                     );
    //                 })
    //             )
    //         )
    //     );
    // });
}

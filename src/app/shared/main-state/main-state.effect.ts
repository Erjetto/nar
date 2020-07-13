import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, select, Store, ActionCreator } from '@ngrx/store';
import { Item, PartialItem, PartialItemObject } from '@sobatbisnis/network';
import { from, Observable, of } from 'rxjs';
import {
  catchError,
  filter,
  map,
  mergeMap,
  share,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators';

import { MessageConstant } from '../../../core/constant/message.constant';
import { LoggerService } from '../../../core/logger/logger.service';
import { UtilService } from '../../../core/util.service';

import * as categoryAction from './category.action';
import { Category } from './category.model';
import * as fromCategory from './category.reducer';
import { CategoryService } from './category.service';

@Injectable()
export class CategoryEffects{

   constructor(
     private actions$: Actions,
     private store: Store<fromCategory.AppState>,
     private service: CategoryService,
     private utilService: UtilService,
     private logger: LoggerService
   ) {}

   @Effect()
   fetchCategory$: Observable<Action> = this.actions$.pipe(
      ofType(categoryAction.Fetch),
      withLatestFrom(
         this.store.pipe(select(fromCategory.getCategoryState)),
         (action: Action, state: fromCategory.AppState) => state
      ),
      switchMap((state: fromCategory.AppState) => {
         const { filters, sort, page } = state;
         
         return this.service.fetchNext(filters, sort, page).pipe(
            mergeMap((result: Item<Category>) => {
               return from([
                  categoryAction.SetTotalElement({payload: result.totalElements}),
                  categoryAction.FetchSuccess({payload: result.content})
               ])
            }),
            catchError((error: Error) => {
               this.logger.error(error.message);
               return of(categoryAction.FetchFail())
            })
         )
      })
   )
   
   @Effect()
   createCategory$: Observable<Action> = this.actions$.pipe(
      ofType(categoryAction.SubmitForm),
      filter(action => !action.payload),
      withLatestFrom(
         this.store.pipe(select(fromCategory.getCategoryState)),
         (action: Action, state: fromCategory.AppState) => state
      ),
      switchMap((state: fromCategory.AppState) => {
         const {formData} = state
         return this.service.createForm(formData).pipe(
            map((result: Category) => 
            categoryAction.CreateSuccess({payload: result})
            )
         )
      })
   )

   @Effect({ dispatch: false })
   createCategorySuccess$: Observable<Category> = this.actions$.pipe(
     ofType(categoryAction.CreateSuccess),
     map((action) => action.payload),
     tap((result: Category) => {
       this.logger.success(MessageConstant.ADD_SUCCESS, { value: result.name });
     }),
     share()
   );

   @Effect()
   updateCategory$: Observable<Action> = this.actions$.pipe(
     ofType(categoryAction.SubmitForm),
     filter((action) => action.payload),
     withLatestFrom(
       this.store.pipe(select(fromCategory.getCategoryState)),
       (action: Action, state: fromCategory.AppState) => state
     ),
     switchMap((state: fromCategory.AppState) => {
       const { formData } = state;
       const id = formData.id;
 
       return this.service.updateForm(formData, id).pipe(
         map(
           (result: Category) => categoryAction.UpdateSuccess({payload: result})
         ),
         catchError((error: Error) => {
           this.logger.error(error.message);
           return of(categoryAction.SubmitFormFail());
         })
       );
     })
   );

   @Effect({ dispatch: false })
   updateCategorySuccess$: Observable<Category> = this.actions$.pipe(
     ofType(categoryAction.UpdateSuccess),
     map((action) => action.payload),
     tap((result: Category) => {
       this.logger.success(MessageConstant.EDIT_SUCCESS, { value: result.name });
     }),
     share()
   );
 
   @Effect()
   deleteCategory$: Observable<Action> = this.actions$.pipe(
     ofType(categoryAction.Delete),
     withLatestFrom(
       this.store.pipe(select(fromCategory.getCategoryState)),
       (action: Action, state: fromCategory.AppState) => state
     ),
     switchMap((state: fromCategory.AppState) => {
       const { selectedCategory } = state;
 
       return this.service.delete(selectedCategory).pipe(
         map((result: PartialItem) => {
           if (result.failEntities.length <= 0) {
             return categoryAction.DeleteSuccess({payload: result.successEntities});
           } else if (result.successEntities.length <= 0) {
             return categoryAction.DeleteFail({payload: result.failEntities});
           } else {
             return categoryAction.DeletePartial({payload: result});
           }
         }),
         catchError((error: Error) => {
           return of(categoryAction.DeleteFail({payload: error}));
         })
       );
     })
   );
 
   

  @Effect()
  deleteCategorySuccess$: Observable<Action> = this.actions$.pipe(
    ofType(categoryAction.DeleteSuccess),
    map((action) => action.payload),
    map((result: Array<PartialItemObject>) => {
      this.logger.success(MessageConstant.DELETE_SUCCESS, {
        value: result.length,
      });
      return categoryAction.Fetch();
    })
  );

  @Effect()
  deleteCategoryFail$: Observable<Action> = this.actions$.pipe(
    ofType(categoryAction.DeleteFail),
    withLatestFrom(
      this.store.pipe(select(fromCategory.getCategoryState)),
      (action, state: fromCategory.AppState) => {
        const result = action.payload;

        if (result instanceof Error) {
          return result.message;
        } else {
          const Categories = state.categories;
          return this.utilService.convertPartialErrorsToString(
            result,
            Categories,
            'name'
          );
        }
      }
    ),
    map((messages: string) => {
      this.logger.error(messages);
      return categoryAction.Fetch();
    })
  );

  @Effect()
  deleteCategoryPartial$: Observable<Action> = this.actions$.pipe(
    ofType(categoryAction.DeletePartial),
    map((action) => action.payload),
    map((result: PartialItem) => {
      this.logger.warning(MessageConstant.DELETE_WARNING, {
        valueSuccess: result.successEntities.length,
        valueFail: result.failEntities.length,
      });

      return categoryAction.DeleteFail({payload: result.failEntities});
    })
  );
}

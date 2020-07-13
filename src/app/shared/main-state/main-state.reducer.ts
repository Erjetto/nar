import * as CategoryActions from "./category.action";
import { Category } from './category.model';
import { Sort, SortDirection } from '@sobatbisnis/common';
import { createReducer, on, createFeatureSelector, createSelector } from '@ngrx/store';
import { merge } from 'lodash';


export interface AppState {
   categories: Array<Category>;
   selectedCategory: Array<Category>;
   formData: Category;
   filters: any;
   sort: Sort;
   page: number;
   loading: boolean;
   totalElements: number;
}

export const initialState: AppState = {
  categories: [],
  selectedCategory: [],
  formData: new Category(),
  filters: {
    name: null,
  },
  sort: new Sort('name', SortDirection.ASC),
  page: 1,
  loading: false,
  totalElements: 10,
};

for(let i = 0; i < 5; i++){
   initialState.categories.push(new Category(i+'', 'Meat', []));
}

export const CATEGORY_REDUCER_NAME = 'category'

export const CategoryReducer = createReducer(
   initialState,
   on(CategoryActions.Fetch,
      CategoryActions.SubmitForm,
      CategoryActions.Delete,
      (state, {}) => ({ ...state, loading: true})),

   on(CategoryActions.FetchFail,
      CategoryActions.SubmitFormFail,
      CategoryActions.DeleteFail,
      (state, {}) => ({ ...state, loading: false})),

   on(CategoryActions.SetFilter,
      (state, {payload}) => ({ ...state, filters: merge({}, state.filters, payload)})),

   on(CategoryActions.SetSort,
      (state, {payload}) => ({ ...state, sort: payload})),

   on(CategoryActions.SetPage,
      (state, {payload}) => ({ ...state, page: payload})),

   on(CategoryActions.SetTotalElement,
      (state, {payload}) => ({ ...state, totalElements: payload})),

   on(CategoryActions.SaveForm,
      (state, {payload}) => ({ ...state, 
         formData: Object.assign(
            new Category(), 
            state.formData, 
            payload || initialState.formData
         )
      })),
      
   on(CategoryActions.SelectData,
      (state, {payload}) => ({ ...state, formData: payload})),

   on(CategoryActions.FetchSuccess,
      (state, {payload}) => ({ ...state, loading: true, categories: payload})),

   on(CategoryActions.CreateSuccess,
      CategoryActions.Reset,
      (state, {}) => ({ ...state, loading: false, formData: initialState.formData})),

   on(CategoryActions.UpdateSuccess,
      (state, {payload}) => ({ ...state, loading: false, formData: payload})),

   on(CategoryActions.DeleteSuccess,
      CategoryActions.DeletePartial,
      CategoryActions.ClearSelected,
      (state, {}) => ({ ...state, loading: false, selectedCategorys: []})),
)

// export const getCategoryState        = (state: AppState) => state
// export const getCategorys            = createFeatureSelector<AppState, Category[]>('categories')
// export const getSelectedCategorys    = createFeatureSelector<AppState, Array<Category>>('selectedCategorys')
// export const getCategoryFormData     = createFeatureSelector<AppState, Category>('formData')
// export const getCategoryFilters      = createFeatureSelector<AppState, any>('filters')
// export const getCategorySort         = createFeatureSelector<AppState, Sort>('sort')
// export const getCategoryPage         = createFeatureSelector<AppState, number>('page')
// export const getCategoryLoading      = createFeatureSelector<AppState, boolean>('loading')
// export const getCategoryTotalElements= createFeatureSelector<AppState, number>('totalElements')
// export const isCategoryListSelected  = (state: AppState) => state.selectedCategorys.length > 0


export const getCategoryState = createFeatureSelector<AppState>(
   CATEGORY_REDUCER_NAME
 );
 const getCategoryStateBy = (fn: (_: AppState) => any) =>
   createSelector(
     getCategoryState,
     fn
   );
 
 export const getCategories = getCategoryStateBy(state => state.categories);
 export const getSelectedCategory = getCategoryStateBy(state => state.selectedCategory);
 export const getCategoryTotalElements = getCategoryStateBy(state => state.totalElements);
 export const getCategoryFormData = getCategoryStateBy(state => state.formData);
 export const getCategoryLoading = getCategoryStateBy(state => state.loading);
 export const getCategoryFilters = getCategoryStateBy(state => state.filters);
 export const getCategorySort = getCategoryStateBy(state => state.sort);
 export const getCategoryPage = getCategoryStateBy(state => state.page);
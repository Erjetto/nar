import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { Action, ActionReducerMap, MetaReducer } from '@ngrx/store';

import { environment } from '../environments/environment';


export interface IAppState {
  router: RouterReducerState;
}

export const reducers: ActionReducerMap<IAppState> = {
  router: routerReducer,
};

export const metaReducers: MetaReducer<IAppState>[] = environment.production
  ? []
  : [];

export const getRouterState = (state: IAppState) => state.router;
export const getSegmentRouterState = (state: IAppState) =>
  state.router.state.url.split(/\//).filter(s => s !== '');

import { createAction, props } from '@ngrx/store';
import { ClientGeneration, Role } from '../../models';


export const ChangeRole        = createAction('[MainState] CHANGE_ROLE', props<{payload: string}>());
export const ChangeGeneration  = createAction('[MainState] CHANGE_GENERATION', props<{payload: string}>());

export const FetchRoles        = createAction('[MainState] FETCH_ROLES');
export const FetchGenerations  = createAction('[MainState] FETCH_GENERATION');

export const FetchRolesSuccess        = createAction('[MainState] FETCH_ROLES_SUCCESS', props<{payload: Role[]}>());
export const FetchGenerationsSuccess  = createAction('[MainState] FETCH_GENERATION_SUCCESS', props<{payload: ClientGeneration[]}>());

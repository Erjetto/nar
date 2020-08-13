import { createAction, props } from '@ngrx/store';
import {
	ClientGeneration,
	Role,
	ClientPhase,
	ClientSubject,
	ClientSchedule,
	Toast,
} from '../../models';

export const ChangeRole = createAction(
	'[MainState] ChangeRole',
	props<{ name: string }>()
);
export const ChangeGeneration = createAction(
	'[MainState] ChangeGeneration',
	props<{ name: string }>()
);

// export const SetPhase      = createAction('[MainState] SetPhase', props<{phaseId: string}>());
// export const SetSubject    = createAction('[MainState] SetSubject', props<{subjectId: string}>());
// export const SetSchedule   = createAction('[MainState] SetSchedule', props<{scheduleId: string}>());

// export const FetchRoles        = createAction('[MainState] FetchRoles');
// export const FetchGenerations  = createAction('[MainState] FetchGenerations');
// export const FetchPhases       = createAction('[MainState] FetchPhases');
// export const FetchSubjects     = createAction('[MainState] FetchSubjects', props<{phaseId: string}>());
// export const FetchSchedules    = createAction('[MainState] FetchSchedules', props<{subjectId: string}>());

// export const FetchRolesSuccess        = createAction('[MainState] FetchRolesSuccess', props<{payload: Role[]}>());
// export const FetchGenerationsSuccess  = createAction('[MainState] FetchGenerationsSuccess', props<{payload: ClientGeneration[]}>());
// export const FetchPhasesSuccess       = createAction('[MainState] FetchPhasesSuccess', props<{payload: ClientPhase[]}>());
// export const FetchSubjectsSuccess     = createAction('[MainState] FetchSubjectsSuccess', props<{payload: ClientSubject[]}>());
// export const FetchSchedulesSuccess    = createAction('[MainState] FetchSchedulesSuccess', props<{payload: ClientSchedule[]}>());

export const ToastMessage = createAction(
	'[MainState] ToastMessage',
	props<{
		message: string;
		messageType: 'info' | 'success' | 'danger' | 'warning';
	}>()
);
export const RemoveMessage = createAction(
	'[MainState] PopMessage',
	props<{ index: number }>()
);

import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay, map, tap, mapTo, catchError, finalize } from 'rxjs/operators';
import { MockData } from '../../mock-data';
import { HttpClient } from '@angular/common/http';
import {
	ClientTrainee,
	ClientGeneration,
	TopBottomVoteSchedule,
	ClientSchedule,
	ClientSubject,
	ClientPhase,
	Role,
	ClientUserInRoles,
	ClientCaseTrainer,
	ClientUploadAnswer,
	SchedulePerWeek,
	Case,
	SimpleTraineeData,
	FLKQueue,
	FLKNote,
} from '../../models';
import { environment } from 'src/environments/environment';
import { map as _map } from 'lodash';
import { DateHelper } from '../../utilities/date-helper';

@Injectable({
	providedIn: 'root',
})
export class LeaderService {
	private baseUrl = environment.apiUrl + 'Leader.svc/';
	constructor(protected httpClient: HttpClient) {}

	public UpdateTraineeActive(data: {
		traineeId: string;
		isActive: boolean;
		reason: string;
	}): Observable<boolean> {
		return this.httpClient
			.post(this.baseUrl + 'UpdateTraineeActive', data)
			.pipe(map((res: any) => res.d === true));
	}

	public UpdateTraineeScore(data: {
		phaseId: string;
		traineeId: string;
		caseId: string;
		newScore: number;
		reason: string;
	}): Observable<boolean> {
		return this.httpClient
			.post(this.baseUrl + 'UpdateTraineeScore', data)
			.pipe(map((res: any) => res.d === true));
	}

	// ClientTraineeBeeAttendanceOverall
	public GetOverall(data: { startDate: string; endDate: string }): Observable<any> {
		return this.httpClient.post(this.baseUrl + 'GetOverall', data);
	}

	public GetAllCaseBySubject(data: { subjectId: string }): Observable<ClientCaseTrainer[]> {
		return this.httpClient
			.post(this.baseUrl + 'GetAllCaseBySubject', data)
			.pipe(map((res: any) => _map(res.d, ClientCaseTrainer.fromJson)));
	}

	// RegisteredSchedule[]
	public GetRegisteredSchedule(data: { subjectId: string }): Observable<any[]> {
		return this.httpClient
			.post(this.baseUrl + 'GetOverall', data)
			.pipe(map((res: any) => res.d as any[]));
	}

	public GetAllTraineeAnswer(data: { caseId: string }): Observable<ClientUploadAnswer[]> {
		return this.httpClient
			.post(this.baseUrl + 'GetAllTraineeAnswer', data)
			.pipe(map((res: any) => _map(res.d, ClientUploadAnswer.fromJson)));
	}

	public CheckCurrentTrainee(data: { traineeList: string[] }): Observable<string[]> {
		return this.httpClient
			.post(this.baseUrl + 'GetAllTraineeAnswer', data)
			.pipe(map((res: any) => _map(res.d, (v) => v + '')));
	}

	public SaveSchedule(data: {
		subjectId: string;
		scheduleName: string;
		scheduleDates: string[];
	}): Observable<ClientSchedule[]> {
		return this.httpClient
			.post(this.baseUrl + 'SaveSchedule', data)
			.pipe(map((res: any) => _map(res.d, ClientSchedule.fromJson)));
	}

	public ChangeSelfRegisterOfSpecificSchedule(data: {
		scheduleId: string;
		flag: boolean;
	}): Observable<boolean> {
		return this.httpClient
			.post(this.baseUrl + 'ChangeSelfRegisterOfSpecificSchedule', data)
			.pipe(map((res: any) => res.d === true));
	}

	public GetDatesInSchedules(data: { scheduleId: string }): Observable<Date[]> {
		return this.httpClient
			.post(this.baseUrl + 'GetDatesInSchedules', data)
			.pipe(map((res: any) => _map(res.d, DateHelper.fromCSharpDate)));
	}

	public GetSpecificScheduleRegistration(data: {
		scheduleId: string;
	}): Observable<SchedulePerWeek> {
		return this.httpClient
			.post(this.baseUrl + 'GetSpecificScheduleRegistration', data)
			.pipe(map((res: any) => SchedulePerWeek.fromJson(res.d)));
	}

	public UpdateCaseIncludingFile(data: {
		caseId: string;
		caseName: string;
		correctorNames: string[];
		traineeDays: string;
		trainerDays: string;
		fileId: string;
		scheduleDate: string;
	}): Observable<string[]> {
		return this.httpClient
			.post(this.baseUrl + 'UpdateCaseIncludingFile', data)
			.pipe(map((res: any) => _map(res.d, (v) => v + '')));
	}

	public UpdateCase(data: {
		caseId: string;
		caseName: string;
		correctorNames: string[];
		traineeDays: string;
		trainerDays: string;
		scheduleDate: string;
	}): Observable<string[]> {
		return this.httpClient
			.post(this.baseUrl + 'UpdateCase', data)
			.pipe(map((res: any) => _map(res.d, (v) => v + '')));
	}

	public SaveCase(data: {
		fileId: string;
		subjectId: string;
		scheduleId: string;
		caseName: string;
		correctorNames: string[];
		traineeDays: string;
		trainerDays: string;
		scheduleDate: string;
		noUpload: boolean;
	}): Observable<string[]> {
		return this.httpClient
			.post(this.baseUrl + 'SaveCase', data)
			.pipe(map((res: any) => _map(res.d, (v) => v + '')));
	}

	public SaveMaterial(data: {
		fileId: string;
		subjectId: string;
		materialName: string;
	}): Observable<boolean> {
		return this.httpClient
			.post(this.baseUrl + 'SaveMaterial', data)
			.pipe(map((res: any) => res.d === true));
	}

	public SaveHasPresentation(data: {
		subjectId: string;
		presentation: boolean;
	}): Observable<boolean> {
		return this.httpClient
			.post(this.baseUrl + 'SaveHasPresentation', data)
			.pipe(map((res: any) => res.d === true));
	}

	public SaveFinalScore(data: {
		phaseId: string;
		subjectId: string;
		data: string[];
	}): Observable<string[]> {
		return this.httpClient
			.post(this.baseUrl + 'SaveFinalScore', data)
			.pipe(map((res: any) => _map(res.d, (v) => v + '')));
	}

	public GetFinalScore(data: { phaseId: string; subjectId: string }): Observable<string[]> {
		return this.httpClient
			.post(this.baseUrl + 'GetFinalScore', data)
			.pipe(map((res: any) => _map(res.d, (v) => v + '')));
	}

	// ClientTraineeInScheduleSpecific
	public GetTraineeScheduleSpecific(data: { phase: string; subject: string }): Observable<any> {
		return this.httpClient
			.post(this.baseUrl + 'GetFinalScore', data)
			.pipe(map((res: any) => res.d));
	}

	public UpdateMaterialWithFile(data: {
		subjectId: string;
		materialId: string;
		fileId: string;
		material: string;
	}): Observable<boolean> {
		return this.httpClient
			.post(this.baseUrl + 'UpdateMaterialWithFile', data)
			.pipe(map((res: any) => res.d === true));
	}

	public UpdateMaterialWithNoFile(data: {
		subjectId: string;
		materialId: string;
		material: string;
	}): Observable<boolean> {
		return this.httpClient
			.post(this.baseUrl + 'UpdateMaterialWithNoFile', data)
			.pipe(map((res: any) => res.d === true));
	}

	public UpdateMaterial(data: {
		subjectId: string;
		materialId: string;
		materialName: string;
	}): Observable<boolean> {
		return this.httpClient
			.post(this.baseUrl + 'UpdateMaterial', data)
			.pipe(map((res: any) => res.d === true));
	}

	public SaveGeneralAssistantRole(data: { value: string }): Observable<string> {
		return this.httpClient
			.post(this.baseUrl + 'SaveGeneralAssistantRole', data)
			.pipe(map((res: any) => res.d + ''));
	}

	public DeleteSchedule(data: { scheduleId: string; reason: string }): Observable<boolean> {
		return this.httpClient
			.post(this.baseUrl + 'DeleteSchedule', data)
			.pipe(map((res: any) => res.d === true));
	}

	public DeleteAllSchedule(data: { reason: string }): Observable<boolean> {
		return this.httpClient
			.post(this.baseUrl + 'DeleteAllSchedule', data)
			.pipe(map((res: any) => res.d === true));
	}

	public DeletePhase(data: { PhaseId: string }): Observable<boolean> {
		return this.httpClient
			.post(this.baseUrl + 'DeletePhase', data)
			.pipe(map((res: any) => res.d === true));
	}

	public DeleteMaterial(data: {
		subjectId: string;
		materialId: string;
		reason: string;
	}): Observable<boolean> {
		return this.httpClient
			.post(this.baseUrl + 'DeleteMaterial', data)
			.pipe(map((res: any) => res.d === true));
	}

	public DeleteTraineeInSchedule(data: {
		ScheduleId: string;
		TraineeId: string;
	}): Observable<boolean> {
		return this.httpClient
			.post(this.baseUrl + 'DeleteTraineeInSchedule', data)
			.pipe(map((res: any) => res.d === true));
	}

	public DeleteCase(data: { caseId: string; reason: string }): Observable<boolean> {
		return this.httpClient
			.post(this.baseUrl + 'DeleteCase', data)
			.pipe(map((res: any) => res.d === true));
	}

	public SaveTopBottomVoteSchedule(data: {
		scheduleName: string;
		startDate: Date;
		endDate: Date;
		voteCount: number;
		isForTrainer: boolean;
	}): Observable<TopBottomVoteSchedule> {
		return this.httpClient
			.post(this.baseUrl + 'SaveTopBottomVoteSchedule', {
				...data,
				startDate: DateHelper.toCSharpDate(data.startDate),
				endDate: DateHelper.toCSharpDate(data.endDate),
			})
			.pipe(map((res: any) => TopBottomVoteSchedule.fromJson(res.d)));
	}

	public UpdateTopBottomVoteSchedule(data: {
		scheduleId: string;
		scheduleName: string;
		startDate: Date;
		endDate: Date;
		voteCount: number;
		isForTrainer: boolean;
	}): Observable<TopBottomVoteSchedule> {
		return this.httpClient
			.post(this.baseUrl + 'UpdateTopBottomVoteSchedule', {
				...data,
				startDate: DateHelper.toCSharpDate(data.startDate),
				endDate: DateHelper.toCSharpDate(data.endDate),
			})
			.pipe(map((res: any) => TopBottomVoteSchedule.fromJson(res.d)));
	}

	public DeleteTopBottomVoteSchedule(data: { scheduleId: string }): Observable<boolean> {
		return this.httpClient
			.post(this.baseUrl + 'DeleteTopBottomVoteSchedule', data)
			.pipe(map((res: any) => res.d === true));
	}

	public ExportTopBottomVoteResult(data: { scheduleId: string }): Observable<string> {
		return this.httpClient
			.post(this.baseUrl + 'ExportTopBottomVoteResult', data)
			.pipe(map((res: any) => res.d));
	}

	// ZipModel
	public GetAllTraineeAnswerByZip(data: { caseId: string; correctorId?: string }): Observable<any> {
		return this.httpClient.post(this.baseUrl + 'GetAllTraineeAnswerByZip', data);
	}

	//#region Get Data
	// SimpleTraineeData[]
	public GetTraineesSimpleData(): Observable<SimpleTraineeData[]> {
		return this.httpClient
			.post(this.baseUrl + 'GetTraineesSimpleData', {})
			.pipe(map((r: any) => _map(r.d, SimpleTraineeData.fromJson)));
	}
	public GetTraineesByPhase(data: { phaseId: string }): Observable<ClientTrainee[]> {
		return this.httpClient
			.post(this.baseUrl + 'GetTraineesByPhase', data)
			.pipe(map((r: any) => _map(r.d, ClientTrainee.fromJson)));
	}

	public GetTraineesBySchedule(data: { scheduleId: string }): Observable<ClientTrainee[]> {
		return this.httpClient
			.post(this.baseUrl + 'GetTraineesBySchedule', data)
			.pipe(map((r: any) => _map(r.d, ClientTrainee.fromJson)));
	}

	public GetGenerations(): Observable<ClientGeneration[]> {
		return this.httpClient
			.post(this.baseUrl + 'GetGenerations', {})
			.pipe(map((r: any) => _map(r.d, ClientGeneration.fromJson)));
	}

	public GetPhases(data: { generationId: string }): Observable<ClientPhase[]> {
		return this.httpClient
			.post(this.baseUrl + 'GetPhases', data)
			.pipe(map((r: any) => _map(r.d, ClientPhase.fromJson)));
	}

	public GetTopBottomVoteSchedules(data: {
		isTrainer: boolean;
	}): Observable<TopBottomVoteSchedule[]> {
		return this.httpClient
			.post(this.baseUrl + 'GetTopBottomVoteSchedules', data)
			.pipe(map((r: any) => _map(r.d, TopBottomVoteSchedule.fromJson)));
	}

	public GetSchedules(data: { subjectId: string }): Observable<ClientSchedule[]> {
		return this.httpClient
			.post(this.baseUrl + 'GetSchedules', data)
			.pipe(map((r: any) => _map(r.d, ClientSchedule.fromJson)));
	}

	public GetCurrentSubject(data: { phaseId: string }): Observable<ClientSubject> {
		return this.httpClient
			.post(this.baseUrl + 'GetCurrentSubject', data)
			.pipe(map((r: any) => ClientSubject.fromJson(r.d)));
	}

	public GetCase(data: { scheduleId: string }): Observable<Case[]> {
		return this.httpClient
			.post(this.baseUrl + 'GetCase', data)
			.pipe(map((r: any) => _map(r.d, Case.fromJson)));
	}

	public GetRoles(): Observable<Role[]> {
		return this.httpClient
			.post(this.baseUrl + 'GetRoles', {})
			.pipe(map((r: any) => _map(r.d, Role.fromJson)));
	}

	public GetUserInRoles(): Observable<ClientUserInRoles[]> {
		return this.httpClient
			.post(this.baseUrl + 'GetUserInRoles', {})
			.pipe(map((r: any) => _map(r.d, ClientUserInRoles.fromJson)));
	}

	public GetMaximumFileSize(data: { subjectId: string }): Observable<number> {
		return this.httpClient
			.post(this.baseUrl + 'GetMaximumFileSize', data)
			.pipe(map((r: any) => Number(r.d)));
	}

	public GetGeneralAssistantRole(): Observable<boolean> {
		return this.httpClient
			.post(this.baseUrl + 'GetGeneralAssistantRole', {})
			.pipe(map((r: any) => !!r.d));
	}
	//#endregion

	//#region Save
	public SaveGeneration(data: {
		generationName: string;
		semester: string;
		year: string;
	}): Observable<boolean> {
		return this.httpClient.post(this.baseUrl + 'SaveGeneration', data).pipe(map((r: any) => !!r.d));
	}

	// datas: ['CompSci, Assistant, 3, 150025626,...', ...]
	public SaveTraineesInGeneration(data: { datas: string[] }): Observable<string[]> {
		return this.httpClient
			.post(this.baseUrl + 'SaveTraineesInGeneration', data)
			.pipe(map((res: any) => res.d as string[]));
	}

	// datas: ['1503251513, ar, T001', ...]
	public SaveChangeMemberType(data: { datas: string[] }): Observable<boolean> {
		return this.httpClient
			.post(this.baseUrl + 'SaveChangeMemberType', data)
			.pipe(map((res: any) => res.d === true));
	}

	public SavePhase(data: {
		name: string;
		beginDate: string;
		endDate: string;
		type: string;
	}): Observable<boolean> {
		return this.httpClient
			.post(this.baseUrl + 'SavePhase', data)
			.pipe(map((res: any) => res.d === true));
	}

	public SaveTraineesToPhase(data: {
		binusianNumbers: string[];
		phaseId: string;
		isAddToSchedule: boolean;
	}): Observable<string[]> {
		// Possible result -> array of existing error
		return this.httpClient
			.post(this.baseUrl + 'SaveTraineesToPhase', data)
			.pipe(map((res: any) => res.d as string[]));
	}

	public SaveSubject(data: { name: string; phaseId: string; value: boolean }): Observable<boolean> {
		return this.httpClient
			.post(this.baseUrl + 'SaveSubject', data)
			.pipe(map((res: any) => res.d === true));
	}

	public SaveMaximumFileSize(data: { fileSize: number; subjectId: string }): Observable<boolean> {
		return this.httpClient
			.post(this.baseUrl + 'SaveMaximumFileSize', data)
			.pipe(map((res: any) => res.d === true));
	}

	public SaveSubjectDetail(data: { subjectId: string; value: boolean }): Observable<boolean> {
		return this.httpClient
			.post(this.baseUrl + 'SaveSubjectDetail', data)
			.pipe(map((res: any) => res.d === true));
	}

	public SaveSpecificSchedule(data: {
		subjectId: string;
		scheduleName: string;
		dataSchedule: any;
		start: string;
		end: string;
		excTrainee: string[];
	}): Observable<boolean> {
		return this.httpClient
			.post(this.baseUrl + 'SaveSpecificSchedule', data)
			.pipe(map((res: any) => res.d === true)); // checked
	}

	public SaveTraineesToSchedule(data: {
		binusianNumbers: string[]; // yyyy-mm-dd
		phaseId: string;
		subjectId: string;
		scheduleId: string;
	}): Observable<string[]> {
		return this.httpClient
			.post(this.baseUrl + 'SaveTraineesToSchedule', data)
			.pipe(map((res: any) => res.d as string[]));
	}

	public SaveUserInRoles(data: { userRoleId: string; usernames: string[] }): Observable<string[]> {
		return this.httpClient
			.post(this.baseUrl + 'SaveUserInRoles', data)
			.pipe(map((res: any) => res.d as string[]));
	}

	//#endregion

	//#region Update/Save Data

	public UpdateGeneration(data: {
		GenerationId: string;
		Description: string;
		Semester: string;
		Year: string;
	}): Observable<boolean> {
		return this.httpClient
			.post(this.baseUrl + 'UpdateGeneration', data)
			.pipe(map((res: any) => res.d === true));
	}

	public UpdatePhase(data: {
		Description: string;
		EndDate: string;
		PhaseId: string;
		StartDate: string;
	}): Observable<boolean> {
		return this.httpClient
			.post(this.baseUrl + 'UpdatePhase', data)
			.pipe(map((res: any) => res.d === true));
	}
	//#endregion

	//#region Delete

	public DeleteTraineeInPhase(data: { PhaseId: string; TraineeId: string }): Observable<boolean> {
		return this.httpClient
			.post(this.baseUrl + 'DeleteTraineeInPhase', data)
			.pipe(map((res: any) => res.d === true));
	}

	public DeleteSubject(data: { subjectId: string }): Observable<boolean> {
		return this.httpClient
			.post(this.baseUrl + 'DeleteSubject', data)
			.pipe(map((res: any) => res.d === true));
	}

	public DeleteAllSubjects(): Observable<boolean> {
		return this.httpClient
			.post(this.baseUrl + 'DeleteAllSubject', {})
			.pipe(map((res: any) => res.d === true));
	}

	public DeleteUserInRoles(data: { userInRoleId: string }): Observable<boolean> {
		return this.httpClient
			.post(this.baseUrl + 'DeleteUserInRoles', data)
			.pipe(map((res: any) => res.d === true));
	}
	//#endregion

	//#region FLK

	public SetFLKQueue(data: {
		flkQueueId: string;
		into: number;
		checker: string;
		note: string;
	}): Observable<boolean> {
		return this.httpClient
			.post(this.baseUrl + 'SetFLKQueue', data)
			.pipe(map((res: any) => res.d === true));
	}

	public GetFLKQueues(): Observable<FLKQueue[]> {
		return this.httpClient
			.post(this.baseUrl + 'GetFLKQueues', {})
			.pipe(map((res: any) => _map(res.d, FLKQueue.fromJson)));
	}

	public GetFLKNotes(): Observable<FLKNote[]> {
		return this.httpClient
			.post(this.baseUrl + 'GetFLKNotes', {})
			.pipe(map((res: any) => _map(res.d, FLKNote.fromJson)));
	}

	//#endregion
}

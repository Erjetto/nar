import { RoleFlags } from './constants/role.constant';
import { isNumber, map, isEmpty } from 'lodash';
import { DateHelper } from './utilities/date-helper';
import { environment } from 'src/environments/environment';

//#region Not from backend
// tslint:disable-next-line: only-arrow-functions
export function GetDownloadLinkFromFileId(fileId: string) {
	return `${environment.apiUrl}File.svc/GetFile/${fileId}`;
}
export type AttendanceType = 'Rest' | 'Room' | 'Secretariat';
export type QuestionStatus = 'wrong' | 'correct' | 'unchecked';
export const EvalTypes = [
	'Tidiness',
	'Case Making',
	'Presentation',
	'Book',
	'Attendance',
	'Others',
];
export const AttendanceStatus = [
	'Present',
	'Late',
	'Absent',
	'Permission',
	'College Permission',
	'Neglects Attendance',
];

export type ToastType = 'info' | 'warning' | 'success' | 'danger';
export class Toast {
	constructor(public messageType: ToastType = 'info', public message = '') {}
}

export class BaseModel {}

// ClientRole -> Role
export class Role {
	public static readonly allRoles = map(RoleFlags, (val: number, key) => new Role(key, val));

	constructor(public roleName = '', public roleNumber = 0, public roleId = '') {}

	static fromJson(data: any) {
		if (isEmpty(data)) return null;
		return new Role(data.Name, RoleFlags[data.Name], data.UserRoleId);
	}

	static from(input: string | number): Role {
		// name/flag to Role
		return this.allRoles.find((r) => r.roleName === input || r.roleNumber === input);
	}

	is(...roleFlags: number[] | Role[]): boolean {
		if (isNumber(roleFlags[0])) return roleFlags.some((num) => (num & this.roleNumber) !== 0);
		else return roleFlags.some((role) => (role.roleNumber & this.roleNumber) !== 0);
	}
}
//#endregion

export class ClientUserInRoles extends BaseModel {
	constructor(public Role = '', public UserInRoleId = '', public UserName = '') {
		super();
	}

	static fromJson(data: any) {
		if (isEmpty(data)) return null;
		return Object.assign(new ClientUserInRoles(), data);
	}
}

export class User extends BaseModel {
	public Role: Role = Role.from('AssistantSupervisor');
	constructor(
		public UserId = '',
		public UserName = '',
		public Name = '',
		public ActiveRole = '',
		public TraineeId = ''
	) {
		super();
	}
	static fromJson(data?: any): User {
		if (isEmpty(data)) return null;
		return Object.assign(new User(), data, {
			Role: Role.from(data?.Role || 'Guest'),
		});
	}
}

export class Binusian extends BaseModel {
	constructor(public Name = '', public UserId = '') {
		super();
	}
	static fromJson(data?: any): Binusian {
		if (isEmpty(data)) return null;
		return Object.assign(new Binusian(), data);
	}
}

export class ClientGeneration extends BaseModel {
	constructor(
		public GenerationId = '',
		public Description = '',
		public Semester = '',
		public Year = 0
	) {
		super();
	}
	public get yearRange() {
		return `${this.Year - 1}/${this.Year}`;
	}
	static fromJson(data?: any): ClientGeneration {
		if (isEmpty(data)) return null;
		return Object.assign(new ClientGeneration(), data);
	}
}

export class ClientPhase extends BaseModel {
	constructor(
		public BeginDate: Date = null,
		public EndDate: Date = null,
		public Description = '',
		public PhaseId = '',
		public PhaseType = ''
	) {
		super();
	}
	static fromJson(data?: any): ClientPhase {
		if (isEmpty(data)) return null;
		return Object.assign(new ClientPhase(), data, {
			BeginDate: DateHelper.fromCSharpDate(data?.BeginDate),
			EndDate: DateHelper.fromCSharpDate(data?.EndDate),
		});
	}
}

export class ClientPhaseSimple extends BaseModel {
	constructor(public Description = '', public PhaseId = '') {
		super();
	}
	static fromJson(data?: any): ClientPhaseSimple {
		if (isEmpty(data)) return null;
		return Object.assign(new ClientPhaseSimple(), data);
	}
}

export class ClientSchedule extends BaseModel {
	constructor(
		public CanSelfRegister = null,
		public Start: Date = null,
		public End: Date = null,
		public IsSpecific = false,
		public ScheduleId = '',
		public ScheduleName = '',
		public ScheduleDates: Date[] = []
	) {
		super();
	}
	public get scheduleType() {
		return this.IsSpecific ? 'Specific' : 'Daily';
	}

	static fromJson(data?: any): ClientSchedule {
		if (isEmpty(data)) return null;
		return Object.assign(new ClientSchedule(), data, {
			Start: DateHelper.fromCSharpDate(data?.Start),
			End: DateHelper.fromCSharpDate(data?.End),
			ScheduleDates: map(data?.ScheduleDates, DateHelper.fromCSharpDate),
		});
	}
}

export class ClientSubject extends BaseModel {
	constructor(
		public HasPresentation = false,
		public Name = '',
		public Phase: ClientPhase = null,
		public SubjectId = '',
		public MaxFileSize = 1 // in bytes
	) {
		super();
	}
	static fromJson(data?: any): ClientSubject {
		if (isEmpty(data)) return null;
		return Object.assign(new ClientSubject(), data, {
			Phase: ClientPhase.fromJson(data?.Phase),
		});
	}
}

//#region Trainee
export class ClientTrainee extends BaseModel {
	constructor(
		public TraineeId = '',
		public TraineeCode = '',
		public TraineeName = '',
		public TraineeNumber = '',
		public IsActive = false
	) {
		super();
	}

	static fromJson(data?: any): ClientTrainee {
		if (isEmpty(data)) return null;
		return Object.assign(new ClientTrainee(), data);
	}

	public get codeAndName() {
		return this.TraineeCode + ' - ' + this.TraineeName;
	}
}

export class TraineeDeactivateReason extends BaseModel {
	constructor(
		public GenerationId = '',
		public TraineeId = '',
		public Reason = '',
		public Date: Date = null,
		public UserName = ''
	) {
		super();
	}

	static fromJson(data?: any): TraineeDeactivateReason {
		if (isEmpty(data)) return null;
		return Object.assign(new TraineeDeactivateReason(), data, {
			Date: DateHelper.fromCSharpDate(data?.Date),
		});
	}
}

export class ClientTraineeDeactivateReason extends BaseModel {
	constructor(
		public GenerationName = '',
		public GenerationId = '',
		public TraineeId = '',
		public Reason = '',
		public Date: Date = null,
		public UserName = ''
	) {
		super();
	}
	static fromJson(data?: any): ClientTraineeDeactivateReason {
		if (isEmpty(data)) return null;
		return Object.assign(new ClientTraineeDeactivateReason(), data, {
			Date: DateHelper.fromCSharpDate(data?.Date),
		});
	}
}

export class ClientTraineeReputation extends BaseModel {
	constructor(
		public TraineeId = '',
		public TraineeName = '',
		public TraineeCode = '',
		public TraineeNumber = '',
		public Gender = 'Asex',
		public PictureId = '',
		public Minus = 0,
		public Neutral = 0,
		public Plus = 0,
		public IsActive = 0,
		public IsVeteran = 0,
		public Major = 'Com suki',
		public DeactivateReason = ''
	) {
		super();
	}

	static fromJson(data?: any): ClientTraineeReputation {
		if (isEmpty(data)) return null;
		return Object.assign(new ClientTraineeReputation(), data);
	}
}

export class ClientTraineeReputationPaging extends BaseModel {
	constructor(
		public CurrentPage = 0,
		public TotalActive = 0,
		public TotalInActive = 0,
		public TraineeCount = 0,
		public TraineeReputation: ClientTraineeReputation[] = []
	) {
		super();
	}
	static fromJson(data?: any): ClientTraineeReputationPaging {
		if (isEmpty(data)) return null;
		return Object.assign(new ClientTraineeReputationPaging(), data, {
			TraineeReputation: data?.TraineeReputation?.map(ClientTraineeReputation.fromJson) ?? [],
		});
	}
}

// fiename: GenerationId|TaineeId
export class AdditionalTraineeData extends BaseModel {
	constructor(
		public GenerationId = '',
		public TraineeId = '',
		public NameBasedOnIDCard = '',
		public KPTOrPassport = '',
		public KPTOrPassportDescrption = '',
		public NPWP = '',
		public PemanentAddress = '',
		public CurrentAddress = '',
		public CurrentAddressType = '',
		public PhoneNumberList: string[] = [],
		public BankAccount = '',
		public BankBranch = ''
	) {
		super();
	}
	public get FileName() {
		return this.GenerationId + '|' + this.TraineeId;
	}
	static fromJson(data?: any): AdditionalTraineeData {
		if (isEmpty(data)) return null;
		return Object.assign(new AdditionalTraineeData(), data);
	}
}

export class ClientTraineeData extends BaseModel {
	constructor(
		public TraineeId = '',
		public PictureId = '',
		public BirthDate: Date = null,
		public TraineeCode = '',
		public TraineeName = '',
		public TraineeNumber = '',
		public Major = '',
		public Gender = '',
		public Scores: ClientTraineeDataScore[] = [],
		public Attendances: ClientTraineeDataAttendance[] = [],
		public Notes: ClientNote[] = [],
		public Semester = '',
		public AdditionalTraineeData: AdditionalTraineeData = null,
		public IsActive = false,
		public IsVeteran = false,
		public DeactivateReasons: ClientTraineeDeactivateReason[] = []
	) {
		super();
	}
	get imageLink() {
		return `${environment.apiUrl}File.svc/GetThumbnail/${this.PictureId}/150`;
	}
	static fromJson(data?: any): ClientTraineeData {
		if (isEmpty(data)) return null;
		return Object.assign(new ClientTraineeData(), data, {
			Scores: map(data?.Scores, ClientTraineeDataScore.fromJson),
			Notes: map(data?.Notes, ClientNote.fromJson),
			Attendances: map(data?.Attendances, ClientTraineeDataAttendance.fromJson),
			AdditionalTraineeData: AdditionalTraineeData?.fromJson(data?.AdditionalTraineeData),
			DeactivateReasons: map(data?.DeactivateReasons, ClientTraineeDeactivateReason.fromJson),
		});
	}
}

export class ClientNote extends BaseModel {
	constructor(
		public Description = '',
		public IsDeleteAble = false,
		public NoteId = '',
		public Reputation = 0,
		public SavedAt: Date = null,
		public SavedBy = ''
	) {
		super();
	}
	static fromJson(data?: any): ClientNote {
		if (isEmpty(data)) return null;
		return Object.assign(new ClientNote(), data, {
			SavedAt: DateHelper.fromCSharpDate(data?.SavedAt),
		});
	}
}

export class ClientTraineeDataScore extends BaseModel {
	constructor(
		public Score = '',
		public CaseName = '',
		public PhaseName = '',
		public ScheduleName = '',
		public EntryBy = ''
	) {
		super();
	}
	static fromJson(data?: any): ClientTraineeDataScore {
		if (isEmpty(data)) return null;
		return Object.assign(new ClientTraineeDataScore(), data);
	}
}

export class ClientTraineeDataAttendance extends BaseModel {
	constructor(
		public Status = '',
		public StatusAttendance = '',
		public Note = '',
		public Reason = '',
		public AttendanceTime: Date = null
	) {
		super();
	}
	static fromJson(data?: any): ClientTraineeDataAttendance {
		if (isEmpty(data)) return null;
		return Object.assign(new ClientTraineeDataAttendance(), data, {
			AttendanceTime: DateHelper.fromCSharpDate(data?.AttendanceTime),
		});
	}
}

export class ClientPeriodicTraineeAttendance extends BaseModel {
	constructor(
		public Trainee: ClientTrainee = null,
		public Present = 0,
		public Permission = 0,
		public Absent = 0,
		public SecretariatLate = 0,
		public SecretariatNeglectsIn = 0,
		public SecretariatNeglectsOut = 0,
		public RoomLate = 0,
		public RoomNeglectsIn = 0,
		public RoomNeglectsOut = 0,
		public RestLate = 0,
		public RestNeglectsIn = 0,
		public RestNeglectsOut = 0,
		public TotalLate = 0,
		public TotalNeglects = 0,
		public PresentDate = '',
		public PermissionDate = '',
		public AbsentDate = '',
		public SecretariatLateDate = '',
		public SecretariatNeglectInDate = '',
		public SecretariatNeglectOutDate = '',
		public RoomLateDate = '',
		public RoomNeglectInDate = '',
		public RoomNeglectOutDate = '',
		public RestLateDate = '',
		public RestNeglectInDate = '',
		public RestNeglectOutDate = ''
	) {
		super();
	}
	static fromJson(data?: any): ClientPeriodicTraineeAttendance {
		if (isEmpty(data)) return null;
		return Object.assign(new ClientPeriodicTraineeAttendance(), data, {
			Trainee: ClientTrainee.fromJson(data?.Trainee),
		});
	}
}

export class ClientTraineeView extends BaseModel {
	constructor(
		public TraineeCode = '',
		public TraineeName = '',
		public TraineeId = '',
		public IsActive = false
	) {
		super();
	}
	static fromJson(data?: any): ClientTraineeView {
		if (isEmpty(data)) return null;
		return Object.assign(new ClientTraineeView(), data);
	}
}

export class ClientScoreTrainee extends BaseModel {
	constructor(
		public TraineeCode = '',
		public TraineeName = '',
		public TraineeNumber = '',
		public TotalScore = 0,
		public Rank = 0,
		public CaseSolved = 0,
		public TotalCase = 0,
		public IsActive = false
	) {
		super();
	}
	static fromJson(data?: any): ClientScoreTrainee {
		if (isEmpty(data)) return null;
		return Object.assign(new ClientScoreTrainee(), data);
	}
}

export class TraineeAttendance extends BaseModel {
	constructor(
		public GenerationId = '',
		public AttendanceId = '',
		public TraineeId = '',
		public TraineeCode = '',
		public TraineeName = '',
		public TraineeNumber = '',
		public Status = '',
		public StatusAttendance = '',
		public Note = '',
		public Reason = '',
		public Type = '',
		public AttendanceTime: Date = null
	) {
		super();
	}
	static fromJson(data?: any): TraineeAttendance {
		if (isEmpty(data)) return null;
		return Object.assign(new TraineeAttendance(), data, {
			AttendanceTime: DateHelper.fromCSharpDate(data?.AttendanceTime),
		});
	}
}

export class ClientTraineeDailyAttendance extends BaseModel {
	constructor(
		public TraineeCode = '',
		public TraineeId = '',
		public TraineeName = '',
		public Rest: ClientTraineeAttendanceTimeDetail = null,
		public Secretariat: ClientTraineeAttendanceTimeDetail = null,
		public Room: ClientTraineeAttendanceTimeDetail = null,
		public Permissions: ClientTraineeAttendanceDetail[] = []
	) {
		super();
	}
	static fromJson(data?: any): ClientTraineeDailyAttendance {
		if (isEmpty(data)) return null;
		return Object.assign(new ClientTraineeDailyAttendance(), data, {
			Rest: ClientTraineeAttendanceTimeDetail.fromJson(data?.Rest),
			Secretariat: ClientTraineeAttendanceTimeDetail.fromJson(data?.Secretariat),
			Room: ClientTraineeAttendanceTimeDetail.fromJson(data?.Room),
			Permissions: map(data?.Permissions, ClientTraineeAttendanceDetail.fromJson),
		});
	}
}

export class ClientTraineeAttendanceReport extends BaseModel {
	constructor(
		public AttendanceSummary: ClientTraineeAttendanceSummary = null,
		public Attendances: ClientTraineeAttendance[] = [],
		public FinalizedBy = '',
		public FinalizedDate: Date = null,
		public IsAlreadyFinalize = false,
		public TransactionDate: Date = null
	) {
		super();
	}
	static fromJson(data?: any): ClientTraineeAttendanceReport {
		if (isEmpty(data)) return null;
		return Object.assign(new ClientTraineeAttendanceReport(), data, {
			Attendances: map(data?.Attendances, ClientTraineeAttendance.fromJson),
			AttendanceSummary: ClientTraineeAttendanceSummary.fromJson(data?.AttendanceSummary),
			FinalizedDate: DateHelper.fromCSharpDate(data?.FinalizedDate),
			TransactionDate: DateHelper.fromCSharpDate(data?.TransactionDate),
		});
	}
}

export class ClientTraineeAttendanceSummary extends BaseModel {
	constructor(
		public AbsentCount = 0,
		public AbsentQuitCount = 0,
		public AttendCount = 0,
		public PermissionCount = 0
	) {
		super();
	}
	static fromJson(data?: any): ClientTraineeAttendanceSummary {
		if (isEmpty(data)) return null;
		return Object.assign(new ClientTraineeAttendanceSummary(), data);
	}
}

export class ClientTraineeAttendance extends BaseModel {
	constructor(
		public TraineeCode = '',
		public TraineeId = '',
		public TraineeName = '',
		public AttendanceTimePermission: ClientTraineeAttendanceDetail[] = [],
		public FulldayPermission = false,
		public IsActive = false,
		public LecturerSchedule = '',
		public Rest: ClientTraineeAttendanceTimeDetail = null,
		public Secretariat: ClientTraineeAttendanceTimeDetail = null,
		public Room: ClientTraineeAttendanceTimeDetail = null
	) {
		super();
	}
	static fromJson(data?: any): ClientTraineeAttendance {
		if (isEmpty(data)) return null;
		return Object.assign(new ClientTraineeAttendance(), data, {
			AttendanceTimePermission: map(
				data?.AttendanceTimePermission,
				ClientTraineeAttendanceDetail.fromJson
			),
			Rest: ClientTraineeAttendanceTimeDetail.fromJson(data?.Rest),
			Secretariat: ClientTraineeAttendanceTimeDetail.fromJson(data?.Secretariat),
			Room: ClientTraineeAttendanceTimeDetail.fromJson(data?.Room),
		});
	}
}

export class ClientTraineeAttendanceTimeDetail extends BaseModel {
	constructor(
		public AttendanceIdIn = '',
		public AttendanceIdOut = '',
		public NoteIn = '',
		public NoteOut = '',
		public StatusAbsentIn = '',
		public StatusAbsentOut = '',
		public TimeIn = '',
		public TimeOut = '',
		public TraineeIn: Date = null,
		public TraineeOut: Date = null
	) {
		super();
	}
	static fromJson(data?: any): ClientTraineeAttendanceTimeDetail {
		if (isEmpty(data)) return null;
		return Object.assign(new ClientTraineeAttendanceTimeDetail(), data, {
			TraineeIn: DateHelper.fromCSharpDate(data?.TraineeIn),
			TraineeOut: DateHelper.fromCSharpDate(data?.TraineeOut),
		});
	}
}

export class ClientTraineeAttendanceDetail extends BaseModel {
	constructor(public AttendanceDate: Date = null, public Reason = '') {
		super();
	}
	static fromJson(data?: any): ClientTraineeAttendanceDetail {
		if (isEmpty(data)) return null;
		return Object.assign(new ClientTraineeAttendanceDetail(), data, {
			AttendanceDate: DateHelper.fromCSharpDate(data?.AttendanceDate),
		});
	}
}

export class TraineePresentation extends BaseModel {
	constructor(
		public IsActive = false,
		public classControl = 0,
		public comment = '',
		public generationId = '',
		public material = '',
		public notes = '',
		public phaseId = '',
		public presentationId = '',
		public presentationNo = 0,
		public savedAt: Date = null,
		public savedBy = '',
		public score = 0,
		public status = '',
		public subjectId = '',
		public traineeCode = '',
		public traineeId = '',
		public traineeName = '',
		public understanding = 0,
		public voice = 0
	) {
		super();
	}
	static fromJson(data?: any): TraineePresentation {
		if (isEmpty(data)) return null;
		return Object.assign(new TraineePresentation(), data, {
			savedAt: DateHelper.fromCSharpDate(data?.savedAt),
		});
	}
}

export class CoreTrainingPresentation extends BaseModel {
	constructor(
		public Comment = '',
		public Deadline: Date = null,
		public GenerationId = '',
		public Material = '',
		public PhaseId = '',
		public PresentationComment: CoreTrainingPresentationComment = null,
		public PresentationDate: Date = null,
		public PresentationNo = 0,
		public Questions: CoreTrainingPresentationQuestion[] = [],
		public SubjectId = '',
		public TraineeCode = '',
		public TraineeId = '',
		public TraineeName = ''
	) {
		super();
	}

	get presentationStatusCode() {
		return `${this.GenerationId}|${this.PhaseId}|${this.SubjectId}|${this.TraineeId}|${this.PresentationNo}`;
	}

	static fromJson(data: any): CoreTrainingPresentation {
    if (isEmpty(data)) return null;
    let res = new CoreTrainingPresentation()
		res = Object.assign(res, data, {
      Deadline: DateHelper.fromCSharpDate(data?.Deadline),
      Questions: map(data?.Questions, (q) => CoreTrainingPresentationQuestion.fromJson(q, res)),
			PresentationDate: DateHelper.fromCSharpDate(data?.PresentationDate),
			PresentationComment: CoreTrainingPresentationItem.fromJson(data?.PresentationComment),
    }) as CoreTrainingPresentation;
    return res
	}
}

export class CoreTrainingPresentationComment extends BaseModel {
	constructor(
		public Comment = '',
		public Histories: DataHistory[] = [],
		public Id = '',
		public UserId = '',
    public UserName = ''
	) {
		super();
	}

	static fromJson(data: any): CoreTrainingPresentationComment {
		if (isEmpty(data)) return null;
		return Object.assign(new CoreTrainingPresentationComment(), data, {
      Histories: map(data?.Histories, DataHistory.fromJson),
		});
	}
}

export class DataHistory extends BaseModel {
	constructor(public Text = '', public UserId = '', public SavedDate: Date = null) {
		super();
	}

	static fromJson(data: any): DataHistory {
		if (isEmpty(data)) return null;
		return Object.assign(new DataHistory(), data, {
			SavedDate: DateHelper.fromCSharpDate(data?.SavedDate),
		});
	}
}

export class CoreTrainingPresentationQuestion extends BaseModel {
	constructor(
		public Question: CoreTrainingPresentationItem = null,
		public Answers: CoreTrainingPresentationItem[] = [],
		public AcceptedAnswerId = '',
		public DeadlinePassed = '',
		public Status = 'unchecked',
		public StatusBy = '',
    
    public parent: CoreTrainingPresentation = null // Additional featue
	) {
		super();
	}

	get rightAnswer() {
		// return this.Answers.find((q) => q.Id === this.AcceptedAnswerId);
		return this.Answers.find((q) => q.Status === 'correct');
  }
  
  get questionLink(){
    return `${environment.apiUrl}/presentation/question/${this.Question.Id}`
  }

	static fromJson(data: any, parent: any): CoreTrainingPresentationQuestion {
		if (isEmpty(data)) return null;
		return Object.assign(new CoreTrainingPresentationQuestion(), data, {
			Question: CoreTrainingPresentationItem.fromJson(data?.Question),
			Answers: map(data?.Answers, CoreTrainingPresentationItem.fromJson),
      parent
		});
	}
}

export class CoreTrainingPresentationQuestionSummary extends BaseModel {
	constructor(public Question = '', public Subject = '') {
		super();
	}

	static fromJson(data: any): CoreTrainingPresentationQuestionSummary {
		if (isEmpty(data)) return null;
		return Object.assign(new CoreTrainingPresentationQuestionSummary(), data);
	}
}

export class CoreTrainingPresentationItem extends BaseModel {
	constructor(
		public Comments: CoreTrainingPresentationItem[] = [],
		public Histories: DataHistory[] = [],
		public Id = '',
		public RespondenUserName = '',
		public Status = '',
		public StatusBy = '',
		public Text = '',
		public UserId = '',
		public UserName = ''
	) {
		super();
	}

	static fromJson(data: any): CoreTrainingPresentationItem {
		if (isEmpty(data)) return null;
		return Object.assign(new CoreTrainingPresentationItem(), data, {
			Histories: map(data?.Histories, DataHistory.fromJson),
			Comments: map(data?.Comments, CoreTrainingPresentation.fromJson),
		});
	}
}

export class TraineeComment extends BaseModel {
	constructor(
		public RowSpan = 0,
		public Trainee: ClientTrainee = null,
		public NotePositive: ClientNoteDetail[] = [],
		public NoteNeutral: ClientNoteDetail[] = [],
		public NoteNegative: ClientNoteDetail[] = []
	) {
		super();
	}
	static fromJson(data?: any): TraineeComment {
		if (isEmpty(data)) return null;
		return Object.assign(new TraineeComment(), data, {
			Trainee: ClientTrainee.fromJson(data?.Trainee),
			NotePositive: map(data?.NotePositive, ClientNoteDetail.fromJson),
			NoteNeutral: map(data?.NoteNeutral, ClientNoteDetail.fromJson),
			NoteNegative: map(data?.NoteNegative, ClientNoteDetail.fromJson),
		});
	}
}

export class TraineeCommentHistory extends BaseModel {
	constructor(
		public TraineeId = '',
		public NoteId = '',
		public TraineeCode = '',
		public Date: Date = null,
		public Comment = '',
		public By = ''
	) {
		super();
	}
	static fromJson(data?: any): TraineeCommentHistory {
		if (isEmpty(data)) return null;
		return Object.assign(new TraineeCommentHistory(), data);
	}
}
// export class EvaluationNote extends BaseModel {
//   constructor(
//     public Note = '',
//     public SavedBy = '',
//     public SavedAt = '',
//   ) {
//     super();
//   }
// 	static fromJson(data?: any): EvaluationNote {
// if(isEmpty(data)) return null;
// 		return Object.assign(new EvaluationNote(), data);
// 	}
// }

// export class ClientScoreTrainee extends BaseModel {
// 	constructor(
// 		public TraineeCode = '',
// 		public TraineeName = '',
// 		public TraineeNumber = '',
// 		public TotalScore = '',
// 		public Rank = '',
// 		public CaseSolved = '',
// 		public TotalCase = '',
// 		public IsActive = false
// 	) {
// 		super();
// 	}
// 	static fromJson(data?: any): ClientScoreTrainee {
// if(isEmpty(data)) return null;
// 		return Object.assign(new ClientScoreTrainee(), data);
// 	}
// }

//#endregion

//#region Case
export class Case extends BaseModel {
	constructor(
		public CaseId = '',
		public CaseName = '',
		public Corrector: Binusian[] = [],
		public FileId = '',
		public FileName = '',
		public ScheduleDate: Date = null,
		public ScheduleName = '',
		public TraineeDeadline: Date = null,
		public TrainerDeadline: Date = null
	) {
		super();
	}
	get correctorList() {
		return this.Corrector.map((b) => b.Name).join(', ');
	}
	static fromJson(data?: any): Case {
		if (isEmpty(data)) return null;
		return Object.assign(new Case(), data, {
			Corrector: map(data?.Corrector, Binusian.fromJson),
			ScheduleDate: DateHelper.fromCSharpDate(data?.ScheduleDate),
			TraineeDeadline: DateHelper.fromCSharpDate(data?.TraineeDeadline),
			TrainerDeadline: DateHelper.fromCSharpDate(data?.TrainerDeadline),
		});
	}
}

export class ClientCaseTrainer extends BaseModel {
	constructor(
		public CaseId = '',
		public CaseName = '',
		public Corrector: string[] = [],
		public FileId = '',
		public ScheduleId = '',
		public StartDate: Date = null,
		public ScheduleDate: Date = null,
		public ScheduleName = '',
		public isAvailable = false, // the only camelcase
		public All = 0,
		public Done = 0,
		public Deadline: Date = null
	) {
		super();
	}
	static fromJson(data?: any): ClientCaseTrainer {
		if (isEmpty(data)) return null;
		return Object.assign(new ClientCaseTrainer(), data, {
			StartDate: DateHelper.fromCSharpDate(data?.StartDate),
			ScheduleDate: DateHelper.fromCSharpDate(data?.ScheduleDate),
			Deadline: DateHelper.fromCSharpDate(data?.Deadline),
		});
	}
}

export class ClientCaseTrainee extends BaseModel {
	constructor(public TotalScore = 0, public Detail: ClientCaseTraineeDetail[] = []) {
		super();
	}

	static fromJson(data?: any): ClientCaseTrainer {
		if (isEmpty(data)) return null;
		return Object.assign(new ClientCaseTrainer(), data, {});
	}
}

export class ClientCaseTraineeDetail extends BaseModel {
	constructor(
		public SubjectId = '',
		public CaseId = '',
		public CaseName = '',
		public Score = '',
		public UploadDate = '',
		public Deadline: Date = null,
		public isAlreadyPassed = false,
		public FileId = '',
		public AnswerId = '',
		public isLevelUp = false
	) {
		super();
	}

	static fromJson(data?: any): ClientCaseTrainer {
		if (isEmpty(data)) return null;
		return Object.assign(new ClientCaseTrainer(), data, {
			Deadline: DateHelper.fromCSharpDate(data?.Deadline),
		});
	}
}

export class UploadAnswer extends BaseModel {
	constructor(
		public CaseId = '',
		public CaseName = '',
		public FileItemId = '',
		public FileName = '',
		public PhaseId = '',
		public TraineeId = '',
		public UploadDate: Date = null,
		public UploadBy: Date = null
	) {
		super();
	}

	static fromJson(data?: any): UploadAnswer {
		if (isEmpty(data)) return null;
		return Object.assign(new UploadAnswer(), data, {
			UploadBy: DateHelper.fromCSharpDate(data?.UploadBy),
			UploadDate: DateHelper.fromCSharpDate(data?.UploadDate),
		});
	}
}

export class ClientUploadAnswer extends BaseModel {
	constructor(
		public CaseId = '',
		public CaseName = '',
		public Corrector = '',
		public CorrectorId = '',
		public EntryDate: Date = null,
		public FileItemId = '',
		public FileName = '',
		public HasFile = false,
		public HasScore = false,
		public PhaseId = '',
		public Score = '',
		public ScoreUpdate = null,
		public TraineeCode = '',
		public TraineeId = '',
		public TraineeName = '',
		public TraineeNumber = '',
		public UploadDate: Date = null,
		public ZeroingReason = ''
	) {
		super();
	}
	static fromJson(data?: any): ClientUploadAnswer {
		if (isEmpty(data)) return null;
		return Object.assign(new ClientUploadAnswer(), data, {
			EntryDate: DateHelper.fromCSharpDate(data?.EntryDate),
			UploadDate: DateHelper.fromCSharpDate(data?.UploadDate),
		});
	}
}
//#endregion

export class RealScore extends BaseModel {
	constructor(
		public PhaseId = '',
		public CaseId = '',
		public CaseName = '',
		public TraineeId = '',
		public Score = '',
		public EntryBy: Binusian = null,
		public UpdateBy: Binusian = null,
		public EntryDate: Date = null,
		public UpdateDate: Date = null,
		public UpdateByReason = '',
		public ZeroingReason = ''
	) {
		super();
	}
	static fromJson(data?: any): RealScore {
		if (isEmpty(data)) return null;
		return Object.assign(new RealScore(), data, {
			EntryBy: Binusian.fromJson(data?.EntryBy),
			UpdateBy: Binusian.fromJson(data?.UpdateBy),
			EntryDate: DateHelper.fromCSharpDate(data?.EntryDate),
			UpdateDate: DateHelper.fromCSharpDate(data?.UpdateDate),
		});
	}
}

//#region Candidate
export class SubcoCandidateQuestionModel extends BaseModel {
	constructor(public GenerationId = '', public Id = '', public Questions: string[] = []) {
		super();
	}
	static fromJson(data?: any): SubcoCandidateQuestionModel {
		if (isEmpty(data)) return null;
		return Object.assign(new SubcoCandidateQuestionModel(), data);
	}
}

export class SubcoCandidateAnswerModel extends BaseModel {
	constructor(
		public Id = '',
		public SubcoCandidateQuestionId = '',
		public TrainerName = '',
		public Answers: string[] = [],
		public StartDate: Date = null,
		public EndDate: Date = null
	) {
		super();
	}
	static fromJson(data?: any): SubcoCandidateAnswerModel {
		if (isEmpty(data)) return null;
		return Object.assign(new SubcoCandidateAnswerModel(), data, {
			StartDate: DateHelper.fromCSharpDate(data?.StartDate),
			EndDate: DateHelper.fromCSharpDate(data?.EndDate),
		});
	}
}
//#endregion

//#region Home
export class ClientStatisticDetail extends BaseModel {
	constructor(public Count = 0, public Description = '') {
		super();
	}
	static fromJson(data?: any): ClientStatisticDetail {
		if (isEmpty(data)) return null;
		return Object.assign(new ClientStatisticDetail(), data);
	}
}

export class ClientStatistic extends BaseModel {
	constructor(public Type = '', public Total = 0, public Detail: ClientStatisticDetail[] = []) {
		super();
	}

	static fromJson(data?: any): ClientStatistic {
		if (isEmpty(data)) return null;
		return Object.assign(new ClientStatistic(), data, {
			Detail: data?.Detail.map(ClientStatisticDetail.fromJson),
		});
	}
}
//#endregion

export class Message extends BaseModel {
	constructor(
		public FileId = '',
		public FileName = '',
		public Generation = '',
		public GenerationId = '',
		public HasFile = '',
		public InsertBy: Binusian = null,
		public InsertOn: Date = null,
		public MemberType = '',
		public MessageId = '',
		public Note = '',
		public Title = ''
	) {
		super();
	}
	public get contentAndAttachmentHTML() {
		return (
			`<p>${this.Note}</p>` +
			(this.HasFile
				? `<p><a title="'Download ${this.FileName}'" href="'File.svc/GetFile/${this.FileId}'">Download Link</a></p>`
				: '')
		);
		// return this.Note + (this.HasFile ? `Attachments here` + this.FileName : '');
	}
	static fromJson(data?: any): Message {
		if (isEmpty(data)) return null;
		return Object.assign(new Message(), data, {
			InsertBy: Binusian.fromJson(data?.InsertBy),
			InsertOn: DateHelper.fromCSharpDate(data?.InsertOn),
		});
	}
}

// GenerationId|MaterialId|TraineeId
export class InterviewMaterial extends BaseModel {
	constructor(
		public MaterialId = '',
		public Trainee: ClientTrainee = null,
		public Materials: InterviewMaterialDetail[] = []
	) {
		super();
	}
	static fromJson(data?: any): InterviewMaterial {
		if (isEmpty(data)) return null;
		return Object.assign(new InterviewMaterial(), data, {
			Trainee: ClientTrainee.fromJson(data?.Trainee),
			Materials: map(data?.Materials, InterviewMaterialDetail.fromJson),
		});
	}
}

export class InterviewMaterialDetail extends BaseModel {
	constructor(public MaterialName = '', public FileId = '', public FileName = '') {
		super();
	}
	get downloadLink() {
		return GetDownloadLinkFromFileId(this.FileId);
	}
	get linkTitle() {
		return `Download '${this.FileName}'`;
	}
	static fromJson(data?: any): InterviewMaterialDetail {
		if (isEmpty(data)) return null;
		return Object.assign(new InterviewMaterialDetail(), data);
	}
}

// SubjectId|MaterialId
export class Material extends BaseModel {
	constructor(
		public SubjectId = '',
		public SubjectName = '',
		public MaterialId = '',
		public MaterialName = '',
		public FileId = '',
		public FileName = ''
	) {
		super();
	}
	static fromJson(data?: any): Material {
		if (isEmpty(data)) return null;
		return Object.assign(new Material(), data);
	}
}

// GenerationId|TraineeId|LectureDate(dd-MMM-yyyy)
export class TraineeLectureSchedule extends BaseModel {
	constructor(
		public GenerationId = '',
		public TraineeId = '',
		public TraineeCode = '',
		public TraineeName = '',
		public TraineeNumber = '',
		public LectureDate: Date = null,
		public LectureSchedule = ''
	) {
		super();
	}
	static fromJson(data?: any): TraineeLectureSchedule {
		if (isEmpty(data)) return null;
		return Object.assign(new TraineeLectureSchedule(), data, {
			LectureDate: DateHelper.fromCSharpDate(data?.LectureDate),
		});
	}
}

// GenerationId|TraineeId|PermissionDate(dd-MMM-yyyy)
export class TraineePermission extends BaseModel {
	constructor(
		public GenerationId = '',
		public TraineeId = '',
		public TraineeCode = '',
		public TraineeName = '',
		public TraineeNumber = '',
		public PermissionDate: Date = null,
		public Reason = ''
	) {
		super();
	}
	static fromJson(data?: any): TraineePermission {
		if (isEmpty(data)) return null;
		return Object.assign(new TraineePermission(), data, {
			PermissionDate: DateHelper.fromCSharpDate(data?.PermissionDate),
		});
	}
}

// GenerationId|TraineeId|Type|AttendanceDate(dd-MMM-yyyy)|TraineeScheduleId
// Type -> Room, Rest, Secretariat
export class TraineeSchedule extends BaseModel {
	constructor(
		public TraineeScheduleId = '',
		public GenerationId = '',
		public TraineeId = '',
		public TraineeCode = '',
		public TraineeName = '',
		public TraineeNumber = '',
		public AttendanceDate: Date = null,
		public Type = '',
		public TimeIn = '',
		public TimeOut = '',
		public InsertedDate: Date = null,
		public Room = '',

		public Shift = ''
	) {
		super();
	}
	static fromJson(data?: any): TraineeSchedule {
		if (isEmpty(data)) return null;
		return Object.assign(new TraineeSchedule(), data, {
			AttendanceDate: DateHelper.fromCSharpDate(data?.AttendanceDate),
			InsertedDate: DateHelper.fromCSharpDate(data?.InsertedDate),
		});
	}
}

export class ClientSpecificSchedule extends BaseModel {
	constructor(
		public ScheduleDate: Date = null,
		public AbsenceStatus = '',
		public SubjectName = '',
		public ShiftStart = 0,
		public ShiftEnd = 0,
		public Room = '',
		public IsPassed = false,
		public AttendanceStatus = ''
	) {
		super();
	}
	static fromJson(data?: any): ClientSpecificSchedule {
		if (isEmpty(data)) return null;
		return Object.assign(new ClientSpecificSchedule(), data, {
			ScheduleDate: DateHelper.fromCSharpDate(data?.ScheduleDate),
		});
	}
}

export class SchedulePerWeek extends BaseModel {
	constructor(
		public Schedule: ScheduleVariation[] = [],
		public ScheduleName = '',
		public MeetingNo = 0,
		public EndDate: Date = null
	) {
		super();
	}
	static fromJson(data?: any): SchedulePerWeek {
		if (isEmpty(data)) return null;
		return Object.assign(new SchedulePerWeek(), data, {
			Schedule: map(data?.Schedule, ScheduleVariation.fromJson),
			EndDate: DateHelper.fromCSharpDate(data?.EndDate),
		});
	}
}

export class ScheduleVariation extends BaseModel {
	constructor(
		public DataFileId = '',
		public VariationId = '',
		public SubjectId = '',
		public ScheduleName = '',
		public MeetingNo = 0,
		public VariationNo = 0,
		public Room = '',
		public Capacity = 0,
		public Detail: ScheduleDetail[] = []
	) {
		super();
	}
	static fromJson(data?: any): ScheduleVariation {
		if (isEmpty(data)) return null;
		return Object.assign(new ScheduleVariation(), data, {
			Detail: map(data?.Details, ScheduleDetail.fromJson),
		});
	}
}

export class ScheduleDetail extends BaseModel {
	constructor(public ShiftStart = 0, public ShiftEnd = 0, public ScheduleDate: Date = null) {
		super();
	}
	static fromJson(data?: any): ScheduleDetail {
		if (isEmpty(data)) return null;
		return Object.assign(new ScheduleDetail(), data, {
			ScheduleDate: DateHelper.fromCSharpDate(data?.ScheduleDate),
		});
	}
}

// GenerationId|TraineeId|LectureDate(dd-MMM-yyyy)
// export class TraineeBeeLectureSchedule extends BaseModel {
// 	constructor(
// 		public GenerationId = '',
// 		public TraineeId = '',
// 		public TraineeName = '',
// 		public TraineeNumber = '',
// 		public LectureDate: Date = null,
// 		public LectureSchedule = ''
// 	) {
// 		super();
// 	}
// 	static fromJson(data?: any): TraineeBeeLectureSchedule {
// if(isEmpty(data)) return null;
// 		return Object.assign(new TraineeBeeLectureSchedule(), data);
// 	}
// }

//#region Top Bottom Vote
export class VoteItem extends BaseModel {
	constructor(public TraineeId = '', public Reason = '') {
		super();
	}
	static fromJson(data?: any): VoteItem {
		if (isEmpty(data)) return null;
		return Object.assign(new VoteItem(), data);
	}
}

export class TopBottomVote extends BaseModel {
	constructor(
		public TraineeId = '',
		public VoteId = '',
		public ScheduleID = '',
		public TopVotes: VoteItem[] = [],
		public BottomVotes: VoteItem[] = []
	) {
		super();
	}
	static fromJson(data?: any): TopBottomVote {
		if (isEmpty(data)) return null;
		return Object.assign(new TopBottomVote(), data, {
			TopVotes: map(data?.TopVotes),
			BottomVotes: map(data?.BottomVotes),
		});
	}
}

export class TrainerTopBottomVote extends BaseModel {
	constructor(
		public TrainerName = '',
		public VoteId = '',
		public ScheduleID = '',
		public TopVotes: VoteItem[] = [],
		public BottomVotes: VoteItem[] = []
	) {
		super();
	}
	static fromJson(data?: any): TrainerTopBottomVote {
		if (isEmpty(data)) return null;
		return Object.assign(new TrainerTopBottomVote(), data, {
			TopVotes: map(data?.TopVotes),
			BottomVotes: map(data?.BottomVotes),
		});
	}
}

export class TopBottomVoteSchedule extends BaseModel {
	constructor(
		public ScheduleId = '',
		public ScheduleName = '',
		public VoteCount = 0,
		public StartDate: Date = null,
		public EndDate: Date = null,
		public isForTrainer = false
	) {
		super();
	}
	static fromJson(data?: any): TopBottomVoteSchedule {
		if (isEmpty(data)) return null;
		return Object.assign(new TopBottomVoteSchedule(), data, {
			StartDate: DateHelper.fromCSharpDate(data?.StartDate),
			EndDate: DateHelper.fromCSharpDate(data?.EndDate),
		});
	}
}

export class ClientVoteBestTrainer extends BaseModel {
	constructor(public UserId = '', public UserName = '', public VoteCount = 0) {
		super();
	}
	static fromJson(data?: any): ClientVoteBestTrainer {
		if (isEmpty(data)) return null;
		return Object.assign(new ClientVoteBestTrainer(), data);
	}
}

export class ClientVoteBestTrainerSchedule extends BaseModel {
	constructor(
		public VoteBestTrainerScheduleId = '',
		public VoteName = '',
		public StartDate: Date = null,
		public EndDate: Date = null,
		public Candidates: Binusian[] = [],
		public WinnerQuota = 0,
		public Description = '',
		public VoteType: 'Trainer' | 'Trainee' | 'All' = 'Trainer',
		public Status = ''
	) {
		super();
	}
	static fromJson(data?: any): ClientVoteBestTrainerSchedule {
		if (isEmpty(data)) return null;
		return Object.assign(new ClientVoteBestTrainerSchedule(), data, {
			StartDate: DateHelper.fromCSharpDate(data?.StartDate),
			EndDate: DateHelper.fromCSharpDate(data?.EndDate),
			Candidates: map(data?.Candidates, Binusian.fromJson),
		});
	}
}

//#endregion

//#region Interview Question
export class ClientInterviewQuestion extends BaseModel {
	constructor(public InterviewQuestionId = '', public InterviewQuestionName = '') {
		super();
	}
	static fromJson(data: any) {
		if (isEmpty(data)) return null;
		return Object.assign(new ClientInterviewQuestion(), data);
	}
}

export class InterviewQuestionDetail extends BaseModel {
	constructor(
		public DescriptionEnglish = '',
		public DescriptionIndonesia = '',
		public Number = 0,
		public Weight = 0
	) {
		super();
	}
	static fromJson(data: any) {
		if (isEmpty(data)) return null;
		return Object.assign(new InterviewQuestionDetail(), data);
	}
}

export class ClientInterviewReport extends BaseModel {
	constructor(
		public DescriptionEnglish = '',
		public DescriptionIndonesia = '',
		public Number = 0,
		public Weight = 0,
		public StatusTotal: { Acc; Rej; Pos } = null,
		public Schedules: ClientInterviewSchedule[] = []
	) {
		super();
	}

	static fromJson(data: any) {
		if (isEmpty(data)) return null;
		return Object.assign(new ClientInterviewReport(), data, {
			Schedules: map(data?.Schedules, ClientInterviewSchedule.fromJson),
			StatusTotal: data?.Schedules.reduce(
				(c, s) => {
					c[s.Result]++;
					return c;
				},
				{ Acc: 0, Rej: 0, Pos: 0 }
			),
		});
	}
}

export class ClientInterviewSchedule extends BaseModel {
	constructor(
		public MainInterviewer = '',
		public CoInterviewer = '',
		public InterviewDate: Date = null,
		public InterviewScheduleId = '',
		public InterviewScore = '',
		public Location = '',
		public Result = '',
		public StartTime = '',
		public EndTime = '',
		public TraineeCode = '',
		public TraineeName = ''
	) {
		super();
	}
	public get startToEndTime() {
		return this.StartTime + ' - ' + this.EndTime;
	}
	static fromJson(data: any) {
		if (isEmpty(data)) return null;
		return Object.assign(new ClientInterviewSchedule(), data, {
			InterviewDate: DateHelper.fromCSharpDate(data?.InterviewDate),
		});
	}
}

export class ClientInterviewResult extends BaseModel {
	constructor(
		public Semester = '',
		public SemesterIndo = '',
		public Year = '',
		public Major = '',
		public Location = '',
		public IsSaved = false,
		public InterviewScheduleId = '',
		public TraineeCode = '',
		public RegistrationCode = '',
		public TraineeId = '',
		public TraineeName = '',
		public TraineeNumber = '',
		public InterviewDate: Date = null,
		public StartTime = '',
		public PictureId = '',
		public EndTime = '',
		public MainInterviewer = '',
		public CoInterviewer = '',
		public Questions: ClientInterviewResultDetail[] = [],
		public Note = '',
		public AttitudeNote = '',
		public DevelopmentNote = '',
		public Summary = '',
		public Decision = '',
		public SavedBy = '',
		public SavedAt: Date = null
	) {
		super();
	}
	public get startToEndTime() {
		return this.StartTime + ' - ' + this.EndTime;
	}
	static fromJson(data: any) {
		if (isEmpty(data)) return null;
		return Object.assign(new ClientInterviewResult(), data, {
			Questions: map(data?.Questions, ClientInterviewResultDetail.fromJson),
			InterviewDate: DateHelper.fromCSharpDate(data?.InterviewDate),
			SavedAt: DateHelper.fromCSharpDate(data?.SavedAt),
		});
	}
}

export class ClientInterviewResultDetail extends BaseModel {
	constructor(
		public DescriptionEnglish = '',
		public DescriptionIndonesia = '',
		public Weight = 0,
		public Number = 0,
		public Value = 0
	) {
		super();
	}
	static fromJson(data?: any): ClientInterviewResultDetail {
		if (isEmpty(data)) return null;
		return Object.assign(new ClientInterviewResultDetail(), data);
	}
}

export class InterviewResultDetail extends BaseModel {
	constructor(public Number = 0, public Value = 0) {
		super();
	}
	static fromJson(data?: any): InterviewResultDetail {
		if (isEmpty(data)) return null;
		return Object.assign(new InterviewResultDetail(), data);
	}
}

export class InterviewTraineeDetail extends BaseModel {
	constructor(
		public Materials: InterviewMaterialDetail[] = [],
		public Phases: InterviewPhase[] = [],
		public Notes: ClientNote[] = []
	) {
		super();
	}
	static fromJson(data?: any): InterviewTraineeDetail {
		if (isEmpty(data)) return null;
		return Object.assign(new InterviewTraineeDetail(), data, {
			Materials: map(data?.Materials, InterviewMaterialDetail.fromJson),
			Phases: map(data?.Phases, InterviewMaterialDetail.fromJson),
			Notes: map(data?.Notes, InterviewMaterialDetail.fromJson),
		});
	}
}

export class InterviewPhase extends BaseModel {
	constructor(
		public Phase = '',
		public Subjects: InterviewSubject[] = [],
		public Permission = '',
		public Late = '',
		public Alpha = '',
		public ForgottoAbsence = ''
	) {
		super();
	}
	static fromJson(data?: any): InterviewPhase {
		if (isEmpty(data)) return null;
		return Object.assign(new InterviewPhase(), data, {
			Subjects: map(data?.Subjects, InterviewSubject.fromJson),
		});
	}
}

export class InterviewSubject extends BaseModel {
	constructor(
		public Subject = '',
		public TotalOnlineScore = '',
		public FinalScore = '',
		public FinalScoreRank = '',
		public Remedial = '',
		public OnsiteScore = '',
		public TotalCase = 0,
		public SolvedCase = 0
	) {
		super();
	}
	static fromJson(data?: any): InterviewSubject {
		if (isEmpty(data)) return null;
		return Object.assign(new InterviewSubject(), data);
	}
}

//#endregion

//#region Note

export class ClientEvaluation extends BaseModel {
	constructor(
		public AbsentNote: AbsentNote[] = [],
		public TraineeComment: TraineeComment[] = [],
		public EvaluationNote: ClientEvaluationNote[] = []
	) {
		super();
	}
	static fromJson(data?: any): ClientEvaluation {
		if (isEmpty(data)) return null;
		return Object.assign(new ClientEvaluation(), data, {
			AbsentNote: map(data?.AbsentNote, AbsentNote.fromJson),
			TraineeComment: map(data?.TraineeComment, TraineeComment.fromJson),
			EvaluationNote: map(data?.EvaluationNote, ClientEvaluationNote.fromJson),
		});
	}
}

export class AbsentNote extends BaseModel {
	constructor(
		public FulldayPermission = false,
		public Rest = '',
		public RestNote = '',
		public Room = '',
		public RoomNote = '',
		public Secretariat = '',
		public SecretariatNote = '',
		public Trainee: ClientTrainee = null
	) {
		super();
	}
	static fromJson(data?: any): AbsentNote {
		if (isEmpty(data)) return null;
		return Object.assign(new AbsentNote(), data, {
			Trainee: ClientTrainee.fromJson(data?.Trainee),
		});
	}
}

export class EvaluationNote extends BaseModel {
	constructor(
		public NoteId = '',
		public Notes = '',
		public SavedBy = '',
		public EvaluationDate: Date = null,
		public SavedAt: Date = null
	) {
		super();
	}
	static fromJson(data?: any): EvaluationNote {
		if (isEmpty(data)) return null;
		return Object.assign(new EvaluationNote(), data, {
			EvaluationDate: DateHelper.fromCSharpDate(data?.EvaluationDate),
			SavedAt: DateHelper.fromCSharpDate(data?.SavedAt),
		});
	}
}

export class ClientEvaluationNote extends BaseModel {
	constructor(
		public NoteId = '',
		public Notes = '',
		public SavedBy = '',
		public EvaluationDate: Date = null,
		public SavedAt: Date = null,
		public IsDeleteAble = false
	) {
		super();
	}
	get evalNoteType() {
		// [ Others ] Lorem ips... -> Others
		const res = /\[(\w+)\]/.exec(this.Notes);
		return res ? res[1] : '';
	}
	static fromJson(data?: any): ClientEvaluationNote {
		if (isEmpty(data)) return null;
		return Object.assign(new ClientEvaluationNote(), data, {
			EvaluationDate: DateHelper.fromCSharpDate(data?.EvaluationDate),
			SavedAt: DateHelper.fromCSharpDate(data?.SavedAt),
		});
	}
}

export class ClientNoteDetail extends BaseModel {
	constructor(public Note = '', public SavedBy = '', public SavedAt = '') {
		super();
	}
	static fromJson(data?: any): ClientNoteDetail {
		if (isEmpty(data)) return null;
		return Object.assign(new ClientNoteDetail(), data);
	}
}

//#endregion

//#region Log
export class LogRoomPIC extends BaseModel {
	constructor(
		public Id = '',
		public Room = '',
		public UserId = '',
		public ComputerSeat = '',
		public Log = '',
		public Presentation = '',
		public SavedDate: Date = null
	) {
		super();
	}
	static fromJson(data?: any): LogRoomPIC {
		if (isEmpty(data)) return null;
		return Object.assign(new LogRoomPIC(), data, {
			SavedDate: DateHelper.fromCSharpDate(data?.SavedDate),
		});
	}
}

export class LogBookPICData extends BaseModel {
	constructor(public Trainee = '', public Correct = '', public Wrong = '', public Note = '') {
		super();
	}
	static fromJson(data?: any): LogBookPICData {
		if (isEmpty(data)) return null;
		return Object.assign(new LogBookPICData(), data);
	}
}

export class LogBookPIC extends BaseModel {
	constructor(
		public Id = '',
		public Data = '',
		public Subject = '',
		public PIC = '',
		public SavedDate: Date = null
	) {
		super();
	}
	static fromJson(data?: any): LogBookPIC {
		if (isEmpty(data)) return null;
		return Object.assign(new LogBookPIC(), data, {
			SavedDate: DateHelper.fromCSharpDate(data?.SavedDate),
		});
	}
}

//#endregion

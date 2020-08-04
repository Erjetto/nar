import { RoleFlags } from './constants/role.constant';
import { isNumber, map } from 'lodash';
import { DateHelper } from './utilities/date-helper';

export class Pair<T, U> {
	constructor(val1: T, val2: U) {
		this[0] = val1;
		this[1] = val2;
	}
}

export class Toast {
	constructor(
		public messageType: 'info' | 'warning' | 'success' | 'danger' = 'info',
		public message = ''
	) {}
}

export class BaseModel {}

// ClientRole -> Role
export class Role {
	public static readonly allRoles = map(
		RoleFlags,
		(val: number, key) => new Role(key, val)
	);

	constructor(
		public roleName = '',
		public roleNumber = 0,
		public roleId = ''
	) {}

	static fromJson(data: any) {
		return new Role(data.Name, RoleFlags[data.Name], data.UserRoleId);
	}

	static fromName(input: string | number): Role {
		// name/flag to Role
		return this.allRoles.find(
			(r) => r.roleName === input || r.roleNumber === input
		);
	}

	is(...roleFlags: number[] | Role[]): boolean {
		if (isNumber(roleFlags[0]))
			return roleFlags.some((num) => (num & this.roleNumber) !== 0);
		else
			return roleFlags.some(
				(role) => (role.roleNumber & this.roleNumber) !== 0
			);
	}
}

export class ClientUserInRoles extends BaseModel {
	constructor(
		public Role = '',
		public UserInRoleId = '',
		public UserName = ''
	) {
		super();
	}

	static fromJson(data: any) {
		return Object.assign(new ClientUserInRoles(), data);
	}
}

export class User extends BaseModel {
	public Role: Role = Role.fromName('AssistantSupervisor');
	constructor(
		public UserId = '',
		public UserName = '',
		public Name = '',
		public ActiveRole = '',
		public TraineeId = ''
	) {
		super();
	}
	static fromJson(input?: any): User {
		return Object.assign(new User(), input, {
			Role: Role.fromName(input.Role),
		});
	}
}

export class Binusian extends BaseModel {
	constructor(public Name = '', public UserId = '') {
		super();
	}
	static fromJson(data?: any): Binusian {
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
		return Object.assign(new ClientPhase(), data, {
			BeginDate: DateHelper.fromCSharpDate(data?.BeginDate),
			EndDate: DateHelper.fromCSharpDate(data?.EndDate),
		});
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
		return Object.assign(new ClientTraineeReputationPaging(), data, {
			TraineeReputation:
				data?.TraineeReputation?.map(ClientTraineeReputation.fromJson) ?? [],
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
	static fromJson(data?: any): ClientTraineeData {
		return Object.assign(new ClientTraineeData(), data, {
			Scores: map(data?.Scores, ClientTraineeDataScore.fromJson),
			Notes: map(data?.Notes, ClientNote.fromJson),
			Attendances: map(data?.Attendances, ClientTraineeDataAttendance.fromJson),
			AdditionalTraineeData: AdditionalTraineeData?.fromJson(
				data?.AdditionalTraineeData
			),
			DeactivateReasons: map(
				data?.DeactivateReasons,
				ClientTraineeDeactivateReason.fromJson
			),
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
		return Object.assign(new ClientTraineeDataAttendance(), data, {
			AttendanceTime: DateHelper.fromCSharpDate(data?.AttendanceTime),
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
		return Object.assign(new ClientTraineeView(), data);
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
		return Object.assign(new ClientTraineeAttendanceReport(), data, {
			Attendances: map(data?.Attendances, ClientTraineeAttendance.fromJson),
			AttendanceSummary: ClientTraineeAttendanceSummary.fromJson(
				data?.AttendanceSummary
			),
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
		return Object.assign(new ClientTraineeAttendance(), data, {
			AttendanceTimePermission: map(
				data?.AttendanceTimePermission,
				ClientTraineeAttendanceDetail.fromJson
			),
			Rest: ClientTraineeAttendanceTimeDetail.fromJson(data?.Rest),
			Secretariat: ClientTraineeAttendanceTimeDetail.fromJson(
				data?.Secretariat
			),
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
		return Object.assign(new TraineePresentation(), data, {
			savedAt: DateHelper.fromCSharpDate(data?.savedAt),
		});
	}
}

export class ClientEvaluation extends BaseModel {
	constructor(
		public AbsentNote: AbsentNote[] = [],
		public TraineeComment: TraineeComment[] = [],
		public EvaluationNote: ClientEvaluationNote[] = []
	) {
		super();
	}
	static fromJson(data?: any): ClientEvaluation {
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
		return Object.assign(new AbsentNote(), data, {
			Trainee: ClientTrainee.fromJson(data?.Trainee),
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
		return Object.assign(new TraineeComment(), data, {
			Trainee: ClientTrainee.fromJson(data?.Trainee),
			NotePositive: map(data?.NotePositive, ClientNoteDetail.fromJson),
			NoteNeutral: map(data?.NoteNeutral, ClientNoteDetail.fromJson),
			NoteNegative: map(data?.NoteNegative, ClientNoteDetail.fromJson),
		});
	}
}

export class ClientNoteDetail extends BaseModel {
	constructor(public Note = '', public SavedBy = '', public SavedAt = '') {
		super();
	}
	static fromJson(data?: any): ClientNoteDetail {
		return Object.assign(new ClientNoteDetail(), data);
	}
}

export class ClientEvaluationNote extends BaseModel {
	constructor(
		public EvaluationDate: Date = null,
		public IsDeleteAble = false,
		public NoteId = '',
		public Notes = '',
		public SavedAt: Date = null,
		public SavedBy = ''
	) {
		super();
	}
	static fromJson(data?: any): ClientEvaluationNote {
		return Object.assign(new ClientEvaluationNote(), data, {
			EvaluationDate: DateHelper.fromCSharpDate(data?.EvaluationDate),
			SavedAt: DateHelper.fromCSharpDate(data?.SavedAt),
		});
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
// 		return Object.assign(new ClientScoreTrainee(), data);
// 	}
// }

//#endregion

//#region Case
export class Case extends BaseModel {
	constructor(
		public CaseId = '',
		public CaseName = '',
		public Corrector: string[] = [],
		public FileId = '',
		public FileName = '',
		public ScheduleDate: Date = null,
		public ScheduleName = '',
		public TraineeDeadline: Date = null,
		public TrainerDeadline: Date = null
	) {
		super();
	}
	static fromJson(data?: any): Case {
		return Object.assign(new Case(), data, {
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
		return Object.assign(new ClientCaseTrainer(), data, {
			StartDate: DateHelper.fromCSharpDate(data?.StartDate),
			ScheduleDate: DateHelper.fromCSharpDate(data?.ScheduleDate),
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
	constructor(
		public GenerationId = '',
		public Id = '',
		public Questions: string[] = []
	) {
		super();
	}
	static fromJson(data?: any): SubcoCandidateQuestionModel {
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
		return Object.assign(new ClientStatisticDetail(), data);
	}
}

export class ClientStatistic extends BaseModel {
	constructor(
		public Type = '',
		public Total = 0,
		public Detail: ClientStatisticDetail[] = []
	) {
		super();
	}

	static fromJson(data?: any): ClientStatistic {
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
	public get contentAndAttachment() {
		return (
			this.Note + (this.HasFile ? '\n\nAttachments:\n' + this.FileName : '')
		);
	}
	static fromJson(data?: any): Message {
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
		return Object.assign(new InterviewMaterial(), data, {
			Trainee: ClientTrainee.fromJson(data?.Trainee),
			Materials: map(data?.Materials, InterviewMaterialDetail.fromJson),
		});
	}
}

export class InterviewMaterialDetail extends BaseModel {
	constructor(
		public MaterialName = '',
		public FileId = '',
		public FileName = ''
	) {
		super();
	}
	static fromJson(data?: any): InterviewMaterialDetail {
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
	static fromJson(data?: any): InterviewMaterialDetail {
		return Object.assign(new InterviewMaterialDetail(), data, {
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
	static fromJson(data?: any): InterviewMaterialDetail {
		return Object.assign(new InterviewMaterialDetail(), data, {
			AttendanceDate: DateHelper.fromCSharpDate(data?.AttendanceDate),
			InsertedDate: DateHelper.fromCSharpDate(data?.InsertedDate),
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
// 		return Object.assign(new TraineeBeeLectureSchedule(), data);
// 	}
// }

//#region Top Bottom Vote
export class VoteItem extends BaseModel {
	constructor(public TraineeId = '', public Reason = '') {
		super();
	}
	static fromJson(data?: any): VoteItem {
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
		return Object.assign(new TopBottomVote(), data, {
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
		public EndDate: Date = null
	) {
		super();
	}
	static fromJson(data?: any): TopBottomVoteSchedule {
		return Object.assign(new TopBottomVoteSchedule(), data, {
			StartDate: DateHelper.fromCSharpDate(data?.StartDate),
			EndDate: DateHelper.fromCSharpDate(data?.EndDate),
		});
	}
}

//#endregion

//#region Interview Question
export class ClientInterviewQuestion extends BaseModel {
	constructor(
		public InterviewQuestionId = '',
		public InterviewQuestionName = ''
	) {
		super();
	}
	static fromJson(data: any) {
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
		return Object.assign(new InterviewQuestionDetail(), data);
	}
}

export class ClientInterviewReport extends BaseModel {
	constructor(
		public DescriptionEnglish = '',
		public DescriptionIndonesia = '',
		public Number = 0,
		public Weight = 0,
		public StatusTotal: {Acc, Rej, Pos} = null,
		public Schedules: ClientInterviewSchedule[] = []
	) {
		super();
	}

	static fromJson(data: any) {
		return Object.assign(new ClientInterviewReport(), data, {
			Schedules: map(data.Schedules, ClientInterviewSchedule.fromJson),
			StatusTotal: data.Schedules.reduce(
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
		return Object.assign(new ClientInterviewSchedule(), data, {
			InterviewDate: DateHelper.fromCSharpDate(data.InterviewDate),
		});
	}
}

//#endregion

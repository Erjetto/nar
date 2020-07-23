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

export class Role {
	public static readonly allRoles = map(
		RoleFlags,
		(val: number, key) => new Role(key, val)
	);

	constructor(public roleName = '', public roleNumber = 0) {}

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
	static fromJson(input: any): User {
		return Object.assign(new User(), input, {
			Role: Role.fromName(input.Role),
		});
	}
}

export class Binusian extends BaseModel {
	constructor(public Name = '', public UserId = '') {
		super();
	}
	static fromJson(data: any): Binusian {
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
	static fromJson(data: any): ClientGeneration {
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
	static fromJson(data: any): ClientPhase {
		return Object.assign(new ClientPhase(), data);
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
	static fromJson(data: any): ClientSchedule {
		return Object.assign(new ClientSchedule(), data, {
			Start: DateHelper.fromCSharpDate(data.Start),
			End: DateHelper.fromCSharpDate(data.End),
			ScheduleDates: map(data.ScheduleDates, DateHelper.fromCSharpDate),
		});
	}
}

export class ClientSubject extends BaseModel {
	constructor(
		public HasPresentation = false,
		public Name = '',
		public Phase: ClientPhase = null,
		public SubjectId = ''
	) {
		super();
	}
	static fromJson(data: any): ClientSubject {
		return Object.assign(new ClientSubject(), data, {
			Phase: ClientPhase.fromJson(data.Phase),
		});
	}
}

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
	static fromJson(data: any): ClientTrainee {
		return Object.assign(new ClientTrainee(), data);
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

	static fromJson(data: any): TraineeDeactivateReason {
		return Object.assign(new TraineeDeactivateReason(), data, {
			Date: DateHelper.fromCSharpDate(data.Date),
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
	static fromJson(data: any): ClientTraineeDeactivateReason {
		return Object.assign(new ClientTraineeDeactivateReason(), data, {
			Date: DateHelper.fromCSharpDate(data.Date),
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

	static fromJson(data: any): ClientTraineeReputation {
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
	static fromJson(data: any): ClientTraineeReputationPaging {
		return Object.assign(new ClientTraineeReputationPaging(), data, {
			TraineeReputation:
				data.TraineeReputation?.map(ClientTraineeReputation.fromJson) ?? [],
		});
	}
}

//fiename: GenerationId|TaineeId
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
	static fromJson(data: any): AdditionalTraineeData {
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
		// public Notes: ClientNote[] = [],
		public Semester = '',
		public AdditionalTraineeData: AdditionalTraineeData = null,
		public IsActive = false,
		public IsVeteran = false,
		public DeactivateReasons: ClientTraineeDeactivateReason[] = []
	) {
		super();
	}
	static fromJson(data: any): ClientTraineeData {
		return Object.assign(new ClientTraineeData(), data, {
			Scores: map(data.Scores, ClientTraineeDataScore.fromJson),
			Attendances: map(data.Attendances, ClientTraineeDataAttendance.fromJson),
			AdditionalTraineeData: AdditionalTraineeData.fromJson(data.AdditionalTraineeData),
			DeactivateReasons: map(data.DeactivateReasons, ClientTraineeDeactivateReason.fromJson),
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
	static fromJson(data: any): ClientTraineeDataScore {
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
	static fromJson(data: any): ClientTraineeDataAttendance {
		return Object.assign(new ClientTraineeDataAttendance(), data, {
      AttendanceTime: DateHelper.fromCSharpDate(data.AttendanceTime)
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
	static fromJson(data: any): ClientTraineeView {
		return Object.assign(new ClientTraineeView(), data);
	}
}

export class ClientScoreTrainee extends BaseModel {
	constructor(
		public TraineeCode = '',
		public TraineeName = '',
		public TraineeNumber = '',
		public TotalScore = '',
		public Rank = '',
		public CaseSolved = '',
		public TotalCase = '',
		public IsActive = false
	) {
		super();
	}
	static fromJson(data: any): ClientScoreTrainee {
		return Object.assign(new ClientScoreTrainee(), data);
	}
}

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
	static fromJson(data: any): Case {
		return Object.assign(new Case(), data, {
			ScheduleDate: DateHelper.fromCSharpDate(data.ScheduleDate),
			TraineeDeadline: DateHelper.fromCSharpDate(data.TraineeDeadline),
			TrainerDeadline: DateHelper.fromCSharpDate(data.TrainerDeadline),
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
	static fromJson(data: any): ClientCaseTrainer {
		return Object.assign(new ClientCaseTrainer(), data, {
			StartDate: DateHelper.fromCSharpDate(data.StartDate),
			ScheduleDate: DateHelper.fromCSharpDate(data.ScheduleDate),
			Deadline: DateHelper.fromCSharpDate(data.Deadline),
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

	static fromJson(data: any): UploadAnswer {
		return Object.assign(new UploadAnswer(), data, {
			UploadBy: DateHelper.fromCSharpDate(data.UploadBy),
			UploadDate: DateHelper.fromCSharpDate(data.UploadDate),
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
	static fromJson(data: any): ClientUploadAnswer {
		return Object.assign(new ClientUploadAnswer(), data, {
			EntryDate: DateHelper.fromCSharpDate(data.EntryDate),
			UploadDate: DateHelper.fromCSharpDate(data.UploadDate),
		});
	}
}

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
	static fromJson(data: any): RealScore {
		return Object.assign(new RealScore(), data, {
			EntryBy: Binusian.fromJson(data.EntryBy),
			UpdateBy: Binusian.fromJson(data.UpdateBy),
			EntryDate: DateHelper.fromCSharpDate(data.EntryDate),
			UpdateDate: DateHelper.fromCSharpDate(data.UpdateDate),
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
	static fromJson(data: any): SubcoCandidateQuestionModel {
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
	static fromJson(data: any): SubcoCandidateAnswerModel {
		return Object.assign(new SubcoCandidateAnswerModel(), data, {
			StartDate: DateHelper.fromCSharpDate(data.StartDate),
			EndDate: DateHelper.fromCSharpDate(data.EndDate),
		});
	}
}
//#endregion

//#region Home
export class ClientStatisticDetail extends BaseModel {
	constructor(public Count = 0, public Description = '') {
		super();
	}
	static fromJson(data: any): ClientStatisticDetail {
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

	static fromJson(data: any): ClientStatistic {
		return Object.assign(new ClientStatistic(), data, {
			Detail: data.Detail.map(ClientStatisticDetail.fromJson),
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
	static fromJson(data: any): Message {
		return Object.assign(new Message(), data, {
			InsertBy: Binusian.fromJson(data.InsertBy),
			InsertOn: DateHelper.fromCSharpDate(data.InsertOn),
		});
	}
}

//GenerationId|MaterialId|TraineeId
export class InterviewMaterial extends BaseModel {
	constructor(
		public MaterialId = '',
		public Trainee: ClientTrainee = null,
		public Materials: InterviewMaterialDetail[] = []
	) {
		super();
	}
	static fromJson(data: any): InterviewMaterial {
		return Object.assign(new InterviewMaterial(), data, {
			Trainee: ClientTrainee.fromJson(data.Trainee),
			Materials: map(data.Materials, InterviewMaterialDetail.fromJson),
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
	static fromJson(data: any): InterviewMaterialDetail {
		return Object.assign(new InterviewMaterialDetail(), data);
	}
}

//SubjectId|MaterialId
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
	static fromJson(data: any): Material {
		return Object.assign(new Material(), data);
	}
}

//GenerationId|TraineeId|LectureDate(dd-MMM-yyyy)
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
	static fromJson(data: any): TraineeLectureSchedule {
		return Object.assign(new TraineeLectureSchedule(), data, {
			LectureDate: DateHelper.fromCSharpDate(data.LectureDate),
		});
	}
}

//GenerationId|TraineeId|PermissionDate(dd-MMM-yyyy)
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
	static fromJson(data: any): InterviewMaterialDetail {
		return Object.assign(new InterviewMaterialDetail(), data, {
			PermissionDate: DateHelper.fromCSharpDate(data.PermissionDate),
		});
	}
}

//GenerationId|TraineeId|Type|AttendanceDate(dd-MMM-yyyy)|TraineeScheduleId
//Type -> Room, Rest, Secretariat
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
	static fromJson(data: any): InterviewMaterialDetail {
		return Object.assign(new InterviewMaterialDetail(), data, {
			AttendanceDate: DateHelper.fromCSharpDate(data.AttendanceDate),
			InsertedDate: DateHelper.fromCSharpDate(data.InsertedDate),
		});
	}
}

//GenerationId|TraineeId|LectureDate(dd-MMM-yyyy)
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
// 	static fromJson(data: any): InterviewMaterialDetail {
// 		return Object.assign(new InterviewMaterialDetail(), data);
// 	}
// }

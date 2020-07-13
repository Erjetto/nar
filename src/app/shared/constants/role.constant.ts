export class RoleConstant {
	public static readonly AssistantSupervisor = 1 << 1;
	public static readonly SubjectCoordinator = 1 << 2;
	public static readonly Trainer = 1 << 3;
	public static readonly Trainee = 1 << 4;
	public static readonly Interviewer = 1 << 5;
	public static readonly Guest = 1 << 6;
	public static readonly Dummy = 1 << 7;
	public static readonly JuniorTrainer = 1 << 8;

	public static readonly ALL = ~0;
	public static readonly SENIOR_ROLES =
		RoleConstant.Trainer |
		RoleConstant.AssistantSupervisor |
		RoleConstant.SubjectCoordinator |
		RoleConstant.Interviewer;
}

// Bitwise operation
// 4 & 2 -> 0 -> false
// 4 & 4 -> 4 -> true
// 4 | 2 -> 6 -> add 2
// 6 & ~2 -> 4 -> remove 2

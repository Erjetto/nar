export class LocalStorage {
	public static useDarkTheme(to?: boolean) {
		if (to !== undefined) localStorage['use-dark-theme'] = to;
		return localStorage['use-dark-theme'];
	}

	public static currentRole(to?: string) {
		if (to !== undefined) localStorage['current-role'] = to;
		return localStorage['current-role'];
	}
}

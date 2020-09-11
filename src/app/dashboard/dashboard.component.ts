
import { Component, OnInit, HostBinding, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { User, Role, ClientGeneration } from '../shared/models';
import { Subject, Observable, of } from 'rxjs';
import { RoleFlags } from '../shared/constants/role.constant';
import { IAppState } from '../app.reducer';
import { Store, select } from '@ngrx/store';
import {
	MainStateAction,
	fromMainState,
	MasterStateAction,
	fromMasterState,
  MainStateEffects,
} from 'src/app/shared/store-modules';
import { MenuService } from '../shared/services/menu.service';
import { Route, Router, ActivatedRoute, NavigationEnd, RouterOutlet } from '@angular/router';
import { filter, takeUntil } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { trigger, transition, query, style, group, animate } from '@angular/animations';

@Component({
	selector: 'rd-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit, OnDestroy {
	@HostBinding('class') hostClass = 'd-flex flex-column';

	isDark = true;

	destroyed$ = new Subject<void>();

	menuList: Route[];
	currentActiveHeader = '';
	pageTitle = document.head.getElementsByTagName('title')[0];

	user = new User();

	constant = {
		role: RoleFlags,
	};

	currentUser$: Observable<User>;
	genList$: Observable<ClientGeneration[]>;
	roleList$: Observable<Role[]>;

	selectedGen$: Observable<string>;
	selectedRole$: Observable<string>;

	constructor(
		private store: Store<IAppState>,
		private router: Router,
		private route: ActivatedRoute,
		private mainEffects: MainStateEffects,
		private cookieService: CookieService,
		private menuService: MenuService
	) {}

	ngOnInit(): void {
    this.initiateTheme();

		// Temporary
    // Get user from user service later
		this.user.Role = Role.fromName(RoleFlags.AssistantSupervisor);
		this.user.ActiveRole = Role.fromName(RoleFlags.AssistantSupervisor).roleName;
		this.menuList = this.menuService.getMenuForRole(this.user.Role.roleNumber);

		// Change currentMenu's name for every route change
		// Assumes every menu has data.name
		this.router.events
			.pipe(
				filter((evt) => evt instanceof NavigationEnd),
				takeUntil(this.destroyed$)
			)
			.subscribe((e: NavigationEnd) => {
				this.currentActiveHeader = this.route.snapshot.firstChild.data.name;
				this.history = [...this.history, e.urlAfterRedirects];
			});
		window.onpopstate = (evt) => (this.isBack = true);

		this.mainEffects.logout$.pipe(takeUntil(this.destroyed$)).subscribe((act) => {
      console.log(act);
      if (act.type === MainStateAction.LogoutSuccess.type) 
        this.router.navigateByUrl('/login');
		});

    // Get data from MainState
    this.currentUser$ = this.store.pipe(select(fromMainState.getCurrentUser));
		// if (this.user.Role.is(RoleFlags.AssistantSupervisor)) {
			this.selectedGen$ = this.store.pipe(select(fromMainState.getCurrentGeneration));
			this.selectedRole$ = this.store.pipe(select(fromMainState.getCurrentRole));

			this.genList$ = this.store.pipe(select(fromMasterState.getGenerations));
			this.roleList$ = of(Role.allRoles);

			// Trigger fetch data
			this.store.dispatch(MasterStateAction.FetchGenerations());
			this.store.dispatch(
				MainStateAction.ChangeRole({
					name: this.user.ActiveRole,
				})
			);

			// TODO: Check how the old nar gets active role and current gen
		// }
	}

	initiateTheme() {
    // Check from cookies first
    
		if (this.cookieService.get('use-dark-theme') !== '')
			this.toggleGreyMode(this.cookieService.get('use-dark-theme') === 'true');
		else if (window.matchMedia) {
      // Get default theme from OS
      this.isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
			this.toggleGreyMode(this.isDark);
		}
	}

	toggleGreyMode(to?: boolean) {
		this.isDark = to != null ? to : !this.isDark;

		if (this.isDark) document.body.classList.add('dark-theme');
		else document.body.classList.remove('dark-theme');

		this.cookieService.set('use-dark-theme', this.isDark ? 'true' : 'false', Number.MAX_SAFE_INTEGER, '/');
	}

	ngOnDestroy(): void {
		this.destroyed$.next();
		this.destroyed$.complete();
	}

	isMenuActive(menu: Route) {
		return menu.data?.name === this.currentActiveHeader;
	}

	onChangeRole(evt: Event) {
		this.store.dispatch(MainStateAction.ChangeRole({ name: evt.target['value'] }));
	}

	onChangeGen(evt: Event) {
		this.store.dispatch(MainStateAction.ChangeGeneration({ name: evt.target['value'] }));
	}

	signOut() {
		this.store.dispatch(MainStateAction.Logout());
	}

	//#region Animation for page
	// tslint:disable-next-line: member-ordering
	currentState = 0;
	// tslint:disable-next-line: member-ordering
	lastPage = '';
	// tslint:disable-next-line: member-ordering
	history: string[] = [];
	// tslint:disable-next-line: member-ordering
	isBack = true;

	getState(outlet: RouterOutlet) {
		const state: string = outlet.activatedRoute.snapshot['_routerState'].url;
		if (this.lastPage === state) return this.currentState;
		this.lastPage = state;

		if (this.isGoingBack(state)) {
			this.currentState--;
		} else this.currentState++;

		console.log(this.currentState);
		return this.currentState;
	}

	isGoingBack(urlTo: string): boolean {
		// [home, case, home] -> if current nav is similar to previous, pop 2
		if (this.isBack || urlTo === this.history[this.history.length - 3]) {
			if (!this.isBack) {
				this.history.pop();
				this.history.pop();
			}
			this.isBack = false;
			return true;
		}
		return false;
	}
	//#endregion
}

//#region Page animation
const rightToLeftScreenSlide = [
	query(':enter, :leave', style({ position: 'fixed', width: '100vw', height: '100vh' })),
	group([
		query(
			':enter',
			[
				style({ opacity: 0, 'animation-delay': '0.5s' }),
				animate('1s ease-in-out', style({ transform: 1, 'animation-delay': '0.5s' })),
				// style({ transform: 'translateX(100%)' }),
				// animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' })),
			],
			{ optional: true }
		),
		query(':leave', [style({ opacity: 1 }), animate('0.5s ease-in-out', style({ opacity: 0 }))], {
			optional: true,
		}),
	]),
];

const leftToRightScreenSlide = [
	query(':enter, :leave', style({ position: 'fixed', width: '100vw', height: '100vh' })),
	group([
		query(
			':enter',
			[
				style({ transform: 'translateX(-100%)' }),
				animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' })),
			],
			{ optional: true }
		),
		query(
			':leave',
			[
				style({ transform: 'translateX(0%)', 'animation-delay': '0.5s' }),
				animate('0.5s ease-in-out', style({ transform: 'translateX(100%)' })),
			],
			{ optional: true }
		),
	]),
];

// animations: [
//   trigger('routerTransition', [
//     transition('void => *', rightToLeftScreenSlide),
//     transition(':increment', rightToLeftScreenSlide),
//     transition(':decrement', rightToLeftScreenSlide),
//   ]),
// ],
//#endregion

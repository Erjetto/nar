import { Component, OnInit, HostBinding, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { User, Role, ClientGeneration } from '../shared/models';
import { Subject, Observable, of, interval, merge, BehaviorSubject } from 'rxjs';
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
import { filter, takeUntil, distinctUntilChanged, first, tap, mapTo } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { trigger, transition, query, style, group, animate } from '@angular/animations';
import { Cookies } from '../shared/constants/cookie.constants';
import { Title } from '@angular/platform-browser';
import { isEmpty as _isEmpty } from 'lodash';

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
	currentRoute: Route;
	currentActiveHeader = '';
	// Not working yet
	pageTitle = document.head.getElementsByTagName('title')[0];

	constant = {
		role: RoleFlags,
	};

	currentUser$: Observable<User>;
	genList$: Observable<ClientGeneration[]>;
	roleList$: Observable<Role[]>;

	loadingChangeGen$ = new BehaviorSubject<boolean>(false);

	selectedGenId$: Observable<string>;
	selectedRole$: Observable<Role>;

	constructor(
		private store: Store<IAppState>,
		private router: Router,
		private route: ActivatedRoute,
		private mainEffects: MainStateEffects,
		private cookieService: CookieService,
    private menuService: MenuService,
    private titleService: Title
  ) {}

  getEndRoute(){
    let root = this.route.snapshot;
    while(root.firstChild) root = root.firstChild;
    return root;
  }
  
	ngOnInit(): void {
		this.initiateTheme();
		this.currentActiveHeader = this.route.snapshot.firstChild.data.name;
    this.titleService.setTitle('NAR - ' + this.getEndRoute().data.name);

		// Change currentMenu's name for every route change
		// Assumes every menu has data.name
		this.router.events
			.pipe(
        filter((evt) => evt instanceof NavigationEnd),
				takeUntil(this.destroyed$)
			)
			.subscribe((e: NavigationEnd) => {
        const endRoute = this.getEndRoute();
        // get first level (Master, Modify, Home, etc)
				this.currentActiveHeader = endRoute.root.firstChild.data.name; 
        this.history = [...this.history, endRoute.data.name];
        this.titleService.setTitle('NAR - ' + this.getEndRoute().data.name);
			});
		window.onpopstate = (evt) => (this.isBack = true); // For animation purpose

		// Redirect to login when logout
		this.mainEffects.logout$.pipe(takeUntil(this.destroyed$)).subscribe((act) => {
			if (act.type === MainStateAction.LogoutSuccess.type) this.router.navigateByUrl('/login');
		});

		// Get data from MainState
		this.currentUser$ = this.store.pipe(select(fromMainState.getCurrentUser));
		this.genList$ = this.store.pipe(select(fromMasterState.getGenerations));
		this.roleList$ = of(Role.allRoles);

		this.selectedGenId$ = this.store.pipe(select(fromMainState.getCurrentGenerationId));
		this.selectedRole$ = this.store.pipe(select(fromMainState.getCurrentRole));

		merge(this.mainEffects.afterRequest$, this.selectedGenId$)
			.pipe(takeUntil(this.destroyed$))
			.subscribe(() => this.loadingChangeGen$.next(false));

		// Update menu when change role
		this.selectedRole$
			.pipe(takeUntil(this.destroyed$), distinctUntilChanged())
			.subscribe((role) => {
				this.menuList = this.menuService.getMenuForRole(role);
				// If current role has no current active menu, then redirect
				if (this.menuList.every((r) => r.data.name !== this.currentActiveHeader))
					this.router.navigateByUrl('/home');
			});

		//#region For SPV
		this.currentUser$
			.pipe(filter((u) => u?.Role?.is(RoleFlags.AssistantSupervisor)))
			.subscribe((u) => {
				this.initiateRoleAndGen();
			});
		//#endregion

		this.store.dispatch(MasterStateAction.FetchGenerations());
		this.store.dispatch(MainStateAction.FetchCurrentGeneration());
	}

	ngOnDestroy(): void {
		this.destroyed$.next();
		this.destroyed$.complete();
	}

	isMenuActive(menu: Route) {
		return menu.data?.name === this.currentActiveHeader;
	}

	onChangeRole(value: Role) {
		this.store.dispatch(MainStateAction.ChangeRole({ role: value }));
	}

	onChangeGen(value: ClientGeneration) {
		this.loadingChangeGen$.next(true);
		this.store.dispatch(MainStateAction.ChangeGeneration({ genId: value.GenerationId }));
	}

	signOut() {
		this.store.dispatch(MainStateAction.Logout());
	}

	initiateRoleAndGen() {
		if (!!localStorage.getItem('current-role'))
			this.store.dispatch(
				MainStateAction.ChangeRole({
					role: Role.from(localStorage.getItem('current-role')),
				})
			);
		else
			this.currentUser$
				.pipe(
					filter((v) => !_isEmpty(v)),
					first()
				)
				.subscribe((u: User) =>
					this.store.dispatch(
						MainStateAction.ChangeRole({
							role: u.Role,
						})
					)
				);
		// NOTE: Current Generation already saved in server side, this not needed
		// if (!!localStorage.getItem('current-gen-id'))
		// 	this.store.dispatch(
		// 		MainStateAction.ChangeGeneration({
		// 			genId: localStorage.getItem('current-gen-id'),
		// 		})
		// 	);
		// else
		// 	this.genList$
		// 		.pipe(
		// 			filter((v) => !_isEmpty(v)),
		// 			first()
		// 		)
		// 		.subscribe((genList) =>
		// 			this.store.dispatch(
		// 				MainStateAction.ChangeGeneration({
		// 					genId: genList[0].GenerationId,
		// 				})
		// 			)
		// 		);
	}

	initiateTheme() {
		// Check from cookies first

		if (this.cookieService.check(Cookies.DARK_THEME))
			this.toggleGreyMode(this.cookieService.get(Cookies.DARK_THEME) === 'true');
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

		this.cookieService.set(
			Cookies.DARK_THEME,
			this.isDark ? 'true' : 'false',
			Number.MAX_SAFE_INTEGER,
			'/'
		);
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

//#region Page animation [UNUSED]
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

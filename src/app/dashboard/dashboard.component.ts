import {
	Component,
	OnInit,
	HostBinding,
	OnDestroy,
} from '@angular/core';
import { User, Role, ClientGeneration } from '../shared/models';
import { Subject, Observable, of } from 'rxjs';
import { RoleFlags } from '../shared/constants/role.constant';
import { IAppState } from '../app.reducer';
import { Store, select } from '@ngrx/store';
import { MainStateAction, fromMainState, MasterStateAction, fromMasterState } from 'src/app/shared/store-modules';
import { MenuService } from '../shared/services/menu.service';
import { Route, Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter, takeUntil } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

@Component({
	selector: 'rd-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss'],
	// changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit, OnDestroy {
	@HostBinding('class') hostClass = 'd-flex flex-column';

	// @HostBinding('class.dark-theme') isDark = true;
	isDark = true;

	destroyed$ = new Subject<void>();

	menuList: Route[];
	currentHeaderMenu = 'Home';

	user = new User();

	constant = {
		role: RoleFlags,
	};

	genList$: Observable<ClientGeneration[]>;
	roleList$: Observable<Role[]>;

	selectedGen$: Observable<string>;
	selectedRole$: Observable<string>;

	constructor(
    private cookieService: CookieService,
		private menuService: MenuService,
		private router: Router,
		private route: ActivatedRoute,
		private store: Store<IAppState>
	) {
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
			.subscribe(() => (this.currentHeaderMenu = this.route.snapshot.firstChild.data.name));
	}

	ngOnInit(): void {
		// Get data from MainState
		if (this.user.Role.is(RoleFlags.AssistantSupervisor)) {
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

      // TODO: Check how old nar gets active role and current gen
      
		}
  }
  
  initiateTheme(){
    // Check from cookies first
    if(this.cookieService.get('use-dark-theme') !== '')
      this.toggleGreyMode(this.cookieService.get('use-dark-theme') === 'true');
      
    else if(window.matchMedia){ // Get default theme from OS
      this.toggleGreyMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
      this.cookieService.set('use-dark-theme', 'true')
    }
  }

	toggleGreyMode(to?: boolean) {
		this.isDark = to != null ? to : !this.isDark;

		if (this.isDark) document.body.classList.add('dark-theme');
    else document.body.classList.remove('dark-theme');

    this.cookieService.set('use-dark-theme', this.isDark ? 'true' : 'false');
	}

	ngOnDestroy(): void {
		this.destroyed$.next();
		this.destroyed$.complete();
	}

	isMenuActive(menu: Route) {
		return menu.data?.name === this.currentHeaderMenu;
	}

	onChangeRole(evt: Event) {
		this.store.dispatch(MainStateAction.ChangeRole({ name: evt.target['value'] }));
	}

	onChangeGen(evt: Event) {
		this.store.dispatch(MainStateAction.ChangeGeneration({ name: evt.target['value'] }));
	}

	signOut() {}
}

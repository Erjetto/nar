import {
	Component,
	OnInit,
	ViewChild,
	HostBinding,
	ElementRef,
	OnDestroy,
  ChangeDetectionStrategy,
} from '@angular/core';
import { User, Role, ClientGeneration } from '../shared/models';
import { GenerationService } from '../shared/services/generation.service';
import { NgModel } from '@angular/forms';
import { Subject, Observable, of, interval } from 'rxjs';
import { RoleFlags } from '../shared/constants/role.constant';
import { IAppState } from '../app.reducer';
import { Store, select } from '@ngrx/store';
import * as MainStateAction from '../shared/stores/main/main.action';
import * as fromMainState from '../shared/stores/main/main.reducer';
import { MenuService } from '../shared/services/menu.service';
import { Route, Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter, takeUntil, delay, tap } from 'rxjs/operators';

@Component({
	selector: 'rd-dashboard',
	templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit, OnDestroy {
	@HostBinding('class') hostClass = 'd-flex flex-column';

	public destroyed$ = new Subject<void>();

	public menuList: Route[];
	public currentHeaderMenu = 'Home';

	public user = new User();

	public constant = {
		role: RoleFlags,
	};

	public genList$: Observable<ClientGeneration[]>;
	public roleList$: Observable<Role[]>;

	public selectedGen$: Observable<string>;
	public selectedRole$: Observable<string>;

	constructor(
		private genService: GenerationService,
		private menuService: MenuService,
		private router: Router,
		private route: ActivatedRoute,
		private store: Store<IAppState>
	) {
    // Temporary
		this.user.Role = Role.fromName(RoleFlags.AssistantSupervisor);
		this.menuList = this.menuService.getMenuForRole(this.user.Role.roleNumber);
    console.log(this.menuList);
    
    // Change currentMenu's name for every route change
    // Assumes every menu has data.name
		this.router.events.pipe(
			filter((evt) => evt instanceof NavigationEnd),
			takeUntil(this.destroyed$)
		).subscribe(() => this.currentHeaderMenu = this.route.snapshot.firstChild.data.name);
	}

	ngOnInit(): void {
    // Get data from MainState
		this.selectedGen$ = this.store.pipe(select(fromMainState.getCurrentGeneration));
		this.selectedRole$ = this.store.pipe(select(fromMainState.getCurrentRole));
		this.genList$ = this.store.pipe(select(fromMainState.getGenerations));
    this.roleList$ = of(Role.allRoles);
    
    // Trigger fetch data
		this.store.dispatch(MainStateAction.FetchGenerations());
		this.store.dispatch(MainStateAction.FetchRoles());
  }
  
  isMenuActive(menu: Route) { return menu.data.name === this.currentHeaderMenu;}

	onChangeRole(evt: Event) {
		this.store.dispatch(
			MainStateAction.ChangeRole({ payload: evt.target['value'] })
		);
	}

	onChangeGen(evt: Event) {
    console.log("OnChangeGen");
    
		this.store.dispatch(
			MainStateAction.ChangeGeneration({ payload: evt.target['value'] })
    );
  }
  
  signOut(){
    
  }

	ngOnDestroy(): void {
		this.destroyed$.next();
		this.destroyed$.complete();
	}
}

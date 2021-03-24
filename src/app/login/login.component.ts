import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { IAppState } from '../app.reducer';
import { MainStateAction, MainStateEffects } from '../shared/store-modules';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
	selector: 'rd-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
	loginForm = this.fb.group({
		username: ['', Validators.required],
		password: ['', Validators.required],
		isPersistent: [false],
	});

	isLoggingIn$ = new BehaviorSubject<boolean>(false);
	destroyed$ = new Subject<void>();

	constructor(
		private store: Store<IAppState>,
		private mainEffects: MainStateEffects,
		private fb: FormBuilder,
		private router: Router
	) {}

	ngOnInit(): void {
		this.mainEffects.afterRequest$
			.pipe(takeUntil(this.destroyed$))
			.subscribe(() => this.isLoggingIn$.next(false));

		this.mainEffects.login$ // Redirect on login success
      .pipe(takeUntil(this.destroyed$))
			.subscribe((act) => {
        if (act.type === MainStateAction.LoginSuccess.type) 
          this.router.navigateByUrl('/home');
			});
	}

	ngOnDestroy() {
		this.destroyed$.next();
		this.destroyed$.complete();
	}

	tryLogin() {
		this.isLoggingIn$.next(true);
		const { username, password, isPersistent } = this.loginForm.value;
		this.store.dispatch(
			MainStateAction.Login({
				userName: username,
				password,
				isPersistent,
			})
		);
	}
}

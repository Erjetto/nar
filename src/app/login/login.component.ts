import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { IAppState } from '../app.reducer';
import { MainStateAction, MainStateEffects } from '../shared/store-modules';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
	selector: 'rd-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy{
	loginForm = this.fb.group({
		username: ['', Validators.required],
		password: ['', Validators.required],
	});

	isLoggingIn = new BehaviorSubject<boolean>(false);
  destroyed$ = new Subject<void>();
  
	constructor(
		private store: Store<IAppState>,
		private mainEffects: MainStateEffects,
		private fb: FormBuilder
	) {}

	ngOnInit(): void {
		this.mainEffects.afterRequest$.pipe(takeUntil(this.destroyed$)).subscribe(() => this.isLoggingIn.next(false));
  }
  
  ngOnDestroy(){
    this.destroyed$.next();
    this.destroyed$.complete();
  }

	tryLogin() {
		this.isLoggingIn.next(true);
		const { username, password } = this.loginForm.value;
		this.store.dispatch(
			MainStateAction.Login({
				name: username,
				password,
			})
		);
	}
}

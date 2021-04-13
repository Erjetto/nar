import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { LocalStorage } from './shared/constants/local-storage.constants';

@Component({
	selector: 'rd-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
	title = 'nar';
	isDark = true;

	constructor(private cookieService: CookieService) {}

	ngOnInit() {
		this.initiateTheme();
	}

	toggleGreyMode(to?: boolean) {
		this.isDark = to != null ? to : !this.isDark;

		if (this.isDark) document.body.classList.add('dark-theme');
		else document.body.classList.remove('dark-theme');

		LocalStorage.useDarkTheme(this.isDark);
	}

	initiateTheme() {
		// Check from cookies first
		if (LocalStorage.useDarkTheme() !== undefined) this.toggleGreyMode(LocalStorage.useDarkTheme());
		else if (window.matchMedia) {
			// Get default theme from OS
			this.isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
			this.toggleGreyMode(this.isDark);
		}
	}
}

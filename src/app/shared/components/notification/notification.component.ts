import {
	ChangeDetectionStrategy,
	Component,
	Input,
	OnChanges,
	OnInit,
	SimpleChange,
	SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { IAppState } from 'src/app/app.reducer';
import { Notification } from '../../models';
import { fromMainState, MainStateAction } from '../../store-modules';
import { DateHelper } from '../../utilities/date-helper';

@Component({
	selector: 'rd-notification',
	templateUrl: './notification.component.html',
	styleUrls: ['./notification.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationComponent implements OnInit {
	viewDateFormat = DateHelper.WEEKDAY_DATE_FORMAT + ' ' + DateHelper.FULL_TIME_FORMAT;

	notifications$: Observable<Notification[]>;
	unreadNotifAmount$: Observable<number>;

	constructor(private store: Store<IAppState>, private router: Router) {}
	ngOnInit(): void {
		this.notifications$ = this.store.pipe(select(fromMainState.getNotifications));
		this.unreadNotifAmount$ = this.notifications$.pipe(
			map((notifs) => notifs.filter((n) => !n.IsRead).length)
		);

		this.store.dispatch(MainStateAction.FetchNotifications());
	}

	clickNotification(notif: Notification) {
		this.store.dispatch(MainStateAction.MarkNotificationRead({ notificationId: notif.Id }));
		this.router.navigateByUrl(notif.Link);
	}

	markAllAsRead() {
		this.store.dispatch(
			MainStateAction.ToastMessage({
				message: 'Marking all as read',
				messageType: 'info',
			})
		);
		this.store.dispatch(MainStateAction.MarkAllNotificationsRead());
	}

	deleteAll() {
		this.store.dispatch(
			MainStateAction.ToastMessage({
				message: 'Deleting all',
				messageType: 'info',
			})
		);
		this.store.dispatch(MainStateAction.DeleteAllNotifications());
	}
}

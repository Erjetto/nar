import { Observable } from 'rxjs';
import * as _ from 'lodash';
import { take, filter, tap, first } from 'rxjs/operators';

export class ObservableHelper {

  // Useful for processing something after fetch
	static tapFirstUnEmpty(observable: Observable<any>, callback: (res:any) => void): Observable<any> {
		return observable.pipe(
      filter(res => !_.isEmpty(res)),
      tap(callback),
      first()
    );
  }
  
  static tapIfEmpty(observable: Observable<any>, callback: () => void): Observable<any> {
		return observable.pipe(
      first(),
      filter(res => !_.isEmpty(res)),
      tap(callback),
    );
    }
}

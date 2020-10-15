import { Observable } from 'rxjs';
import { isEmpty as _isEmpty} from 'lodash';
import { take, filter, tap, first } from 'rxjs/operators';

export class ObservableHelper {

  // Useful for processing something after fetch
	static tapFirstUnEmpty(observable: Observable<any>, callback: (res:any) => void): Observable<any> {
		return observable.pipe(
      filter(res => !_isEmpty(res)),
      tap(callback),
      first()
    );
  }
  
  static tapIfEmpty(observable: Observable<any>, callback: () => void): Observable<any> {
		return observable.pipe(
      first(),
      filter(res => !_isEmpty(res)),
      tap(callback),
    );
    }
}

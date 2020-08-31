import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  protected url: string;

  constructor(protected httpClient: HttpClient) {}

  public get(id?: string): Observable<any> {
    // let params = new HttpParams().set('id', id)
    return this.httpClient.get(this.url + (id || ''));
  }

  public post(data: any): Observable<any> {
    return this.httpClient.post(this.url, data);
  }

  public update(data: { id: string }): Observable<any> {
    return this.httpClient.patch(this.url + data.id, data);
  }

  public delete(id: string): Observable<any> {
    // let params = new HttpParams().set('id', id)
    return this.httpClient.delete(this.url + id);
  }
}

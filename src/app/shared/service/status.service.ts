import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  private status$: Observable<string>;

  constructor(
    private readonly httpClient: HttpClient
  ) {
    this.status$ = this.httpClient.get('/api/status').pipe(
      map((response) => response[0].message)
    );
  }

  public get getStatus$(): Observable<string> {
    return this.status$;
  }
}

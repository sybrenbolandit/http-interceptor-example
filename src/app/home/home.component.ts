import { Component, OnInit } from '@angular/core';
import { StatusService } from '../shared/service/status.service';
import { Subject, Observable, of } from 'rxjs';
import { switchMap, startWith, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public statusText$: Observable<string>;
  public triggerStatus$ = new Subject();

  constructor(
    private readonly statusService: StatusService
  ) { }

  ngOnInit() {
    this.statusText$ = this.triggerStatus$.pipe(
      switchMap(() => this.statusService.getStatus$),
      startWith('no status'),
      catchError((errors) => of('ERROR'))
    );
  }

  showStatus() {
    this.triggerStatus$.next();
  }
}

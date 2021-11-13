import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { switchMap, takeUntil } from 'rxjs/operators';
import { of, Subject } from 'rxjs';
import { AppFetchState } from 'src/app/state';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';

@Component({
  selector: 'app-equipaggio-page',
  templateUrl: './equipaggio-page.component.html',
  styleUrls: ['./equipaggio-page.component.scss']
})
export class EquipaggioPageComponent implements OnInit, OnDestroy {
  private _onDestroy: Subject<any> = new Subject<any>();
  constructor(private store: Store<AppState>) { }
  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  ngOnInit() {

      this.store.select(reducers => reducers.detailVigiliReducer)
      .pipe(
        takeUntil(this._onDestroy)
      )
      .subscribe(data => {
        console.log(data);
      })

  }

}

import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { switchMap, takeUntil, filter, map } from 'rxjs/operators';
import { of, Subject, BehaviorSubject, Observable } from 'rxjs';
import { AppFetchState } from 'src/app/state';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { DotazioneListComponent } from '../dotazione-list/dotazione-list.component';
import { DotazioneFormComponent } from '../dotazione-form/dotazione-form.component';

@Component({
  selector: 'app-equipaggio-page',
  templateUrl: './dotazione-page.component.html',
  styleUrls: ['./dotazione-page.component.scss']
})
export class DotazionePageComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('listDotazioni') listDotazioni: DotazioneListComponent;
  @ViewChild('formDotazioni') formDotazioni: DotazioneFormComponent;

  private _onDestroy: Subject<any> = new Subject<any>();
  idVigile: number;
  constructor(private store: Store<AppState>) { }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
  /**
   * 
   * @param record 
   */
  onSelectionChange(record) {
    if (record) {
      this.formDotazioni.caricaDati(record['codice']);
    }
  }

  onAfterDelete() {
    this.listDotazioni.loadGridData(this.idVigile);
  }
  /**
  * 
  * @param id 
  */
  onAfterSave(data) {
    this.listDotazioni.loadGridData(this.idVigile, data['id']);
  }

  afterRenderGrid() {
    this.store.select(reducers => reducers.detailVigiliReducer)
      .pipe(
        takeUntil(this._onDestroy),
        filter(data => data.data != null),
        map(data => data.data['id'])
      ).subscribe(idVigile => {
        if (this.formDotazioni &&
          this.formDotazioni.myForm) {
          this.formDotazioni.myForm.reset();
        }
        this.idVigile = idVigile;
        this.listDotazioni.loadGridData(this.idVigile);
      })
  }

  ngOnInit() {


  }

  ngAfterViewInit(): void {

  }

}

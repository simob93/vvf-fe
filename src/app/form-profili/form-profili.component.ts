import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RuoliService } from '../service/ruoli.service';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Observable, BehaviorSubject, Subject, combineLatest, forkJoin } from 'rxjs';
import { switchMap, filter, map, tap, switchMapTo, withLatestFrom } from 'rxjs/operators';
import { GestProfiliService } from '../service/profili-shared.service';
import { isValidID, resetStateForm, sporcaForm } from '../utils/functions';
import { MatDialog } from '@angular/material';
import { EditPermessoComponent } from '../edit-permesso/edit-permesso.component';
import { KeyValue } from '@angular/common';
import { StandardMessageComponent } from '../common/standard-message/standard-message.component';

@Component({
  selector: 'app-form-profili',
  templateUrl: './form-profili.component.html',
  styleUrls: ['./form-profili.component.scss']
})
export class FormProfiliComponent implements OnInit, OnDestroy {

  myForm: FormGroup;
  gridMenuApi: any;
  listPermessi$: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  _onDestroy: Subject<any> = new Subject<any>();

  // definizione colonne
  displayedColumns: any = [
    {
      headerName: 'Voce',
      flex: 1,
      field: 'valore'
    },
    {
      headerName: 'Permesso',
      flex: 1,
      field: 'extra',
      valueFormatter: (rec) => {
        const permesso = rec.value;
        if (permesso == 'S') {
          return 'Lettura/Scrittura';
        } else {
          return 'Nessun permesso';
        }
      }
    },
    {
      headerName: 'Azioni',
      width: 90,
      tooltip: (params) => 'Modifica permesso',
      cellRenderer: (rec) => {
        return '<img align="center" alt="Modifica permesso" width="24" height="24" src="assets/images/general/edit.png">';
      }
    }

  ]
  constructor(private formBuilder: FormBuilder,
    private ruoliService: RuoliService,
    private dialog: MatDialog,
    private gestProfiliService: GestProfiliService) {

  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete()
  }

  onCellClicked(event) {
    if (event.event.target.tagName == 'IMG') {

      let dialogRef = this.dialog.open(EditPermessoComponent, {
        width: '350px',
        data: event.data
      });

      const {
        id: idRuolo
      } = this.myForm.value

      dialogRef.afterClosed()
        .pipe(
          takeUntil(this._onDestroy),
          switchMap(data => {
            return this.ruoliService.listPermessiCbox(idRuolo)
          })
        ).subscribe(resp => {
          this.listPermessi$.next(resp['data'])
        })

    }
  }

  onClickBtnNuovo() {
    this.myForm.reset();
    this.listPermessi$.next([]);
    sporcaForm(this.myForm);
  }

  salvaRecord() {

    let record = this.myForm.value;

    const {
      id
    } = record;

    if (isValidID(id)) {
      this.ruoliService.update(record)
        .pipe(
          takeUntil(this._onDestroy),
          map(resp => resp.data))
        .subscribe(data => {
          this.gestProfiliService.refershProfili(data['id'])
          resetStateForm(this.myForm)
        })
    } else {
      this.ruoliService.save(record)
        .pipe(
          takeUntil(this._onDestroy),
          map(resp => resp.data))
        .subscribe(data => {
          this.gestProfiliService.refershProfili(data['id'])
          resetStateForm(this.myForm)
        })
    }
  }

  onClickConferma() {
    this.salvaRecord();
  }

  onClickBtnRipristina() {
    if (!!this.gestProfiliService.getProfiloSel()) {
      this.gestProfiliService.setProfilo(this.gestProfiliService.getProfiloSel());
    } else {
      this.myForm.reset();
    }
  }

  onClickElimina() {
    const {
      id
    } = this.myForm.getRawValue();

    this.dialog.open(StandardMessageComponent, {
      data: {
        type: 'DEL',
        callbackOnOk: () => {
          this.ruoliService.delete(id)
            .subscribe(resp => {
              if (resp.success) {
                this.gestProfiliService.refershProfili(null);
                this.myForm.reset();
              }

            })
        }
      }
    });
  }
  /**
   * 
   * @param params 
   */
  onGridReady(params) {
    this.gridMenuApi = params.api;
  }

  getRowNodeId = (data) => {
    return data.codice
  }

  ngOnInit() {

    this.myForm = this.formBuilder.group({
      id: ['', []],
      descrizione: ['', [Validators.required]]
    })

    this.gestProfiliService
      .nextProfilo
      .pipe(
        takeUntil(this._onDestroy),
        filter(data => !!data),
        switchMap(data => {
          return forkJoin(this.ruoliService.listPermessiCbox(data), this.ruoliService.get(data))
        })
      ).subscribe(([permessiResp, valueFormResp]) => {
        this.listPermessi$.next(permessiResp['data'])
        this.myForm.patchValue(valueFormResp['data'])
        resetStateForm(this.myForm);
      });

  }

}
